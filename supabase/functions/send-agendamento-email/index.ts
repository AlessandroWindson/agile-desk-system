
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AgendamentoEmailRequest {
  to: string;
  nome: string;
  tipo: 'confirmacao' | 'atendido';
  dataAgendamento: string;
  tecnico?: string;
  servico?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, nome, tipo, dataAgendamento, tecnico, servico }: AgendamentoEmailRequest = await req.json();

    let subject = "";
    let html = "";

    if (tipo === 'confirmacao') {
      subject = "Confirmação de Agendamento - HelpDesk Pro";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">HelpDesk Pro</h1>
            <p style="color: #93c5fd; margin: 10px 0 0 0;">Confirmação de Agendamento</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h2 style="color: #1e3a8a; margin-top: 0;">Olá ${nome}!</h2>
            <p style="color: #475569; line-height: 1.6;">Seu agendamento foi <strong>solicitado com sucesso</strong>!</p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Detalhes do Agendamento:</h3>
              <p style="margin: 8px 0;"><strong>Data/Hora:</strong> ${new Date(dataAgendamento).toLocaleString('pt-BR')}</p>
              ${servico ? `<p style="margin: 8px 0;"><strong>Serviço:</strong> ${servico}</p>` : ''}
              ${tecnico ? `<p style="margin: 8px 0;"><strong>Técnico:</strong> ${tecnico}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #f59e0b;">Aguardando confirmação</span></p>
            </div>
            
            <p style="color: #475569;">Nossa equipe entrará em contato em breve para confirmar o agendamento.</p>
            <p style="color: #475569; margin-bottom: 0;">Atenciosamente,<br><strong>Equipe HelpDesk Pro</strong></p>
          </div>
        </div>
      `;
    } else {
      subject = "Agendamento Atendido - HelpDesk Pro";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">HelpDesk Pro</h1>
            <p style="color: #86efac; margin: 10px 0 0 0;">Agendamento Concluído</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; border-left: 4px solid #10b981;">
            <h2 style="color: #059669; margin-top: 0;">Olá ${nome}!</h2>
            <p style="color: #475569; line-height: 1.6;">Seu agendamento foi <strong>atendido com sucesso</strong>!</p>
            
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
              <h3 style="color: #059669; margin-top: 0;">Serviço Concluído:</h3>
              <p style="margin: 8px 0;"><strong>Data/Hora:</strong> ${new Date(dataAgendamento).toLocaleString('pt-BR')}</p>
              ${servico ? `<p style="margin: 8px 0;"><strong>Serviço:</strong> ${servico}</p>` : ''}
              ${tecnico ? `<p style="margin: 8px 0;"><strong>Técnico:</strong> ${tecnico}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #059669;">✅ Concluído</span></p>
            </div>
            
            <p style="color: #475569;">Obrigado por confiar nos nossos serviços!</p>
            <p style="color: #475569; margin-bottom: 0;">Atenciosamente,<br><strong>Equipe HelpDesk Pro</strong></p>
          </div>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "HelpDesk Pro <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    });

    console.log(`E-mail de ${tipo} enviado para ${nome}:`, emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
