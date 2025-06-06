import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }

  static createAgendamentoEmail(template: string, nome: string, data: string, tecnico: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Confirmação de Agendamento</h2>
        <p>Olá ${nome},</p>
        <p>Seu agendamento foi realizado com sucesso!</p>
        <p><strong>Data do Agendamento:</strong> ${data}</p>
        <p><strong>Técnico Responsável:</strong> ${tecnico}</p>
        <p>Por favor, compareça no horário agendado.</p>
        <p>Atenciosamente,</p>
        <p>Equipe HelpDesk Pro</p>
      </div>
    `;
  }

  static createAtendimentoEmail(template: string, nome: string, data: string, tecnico: string, status: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2>Atualização de Atendimento</h2>
        <p>Olá ${nome},</p>
        <p>Seu atendimento foi atualizado!</p>
        <p><strong>Data do Agendamento:</strong> ${data}</p>
        <p><strong>Técnico Responsável:</strong> ${tecnico}</p>
        <p><strong>Status Atual:</strong> ${status}</p>
        <p>Para mais detalhes, acesse seu painel no HelpDesk Pro.</p>
        <p>Atenciosamente,</p>
        <p>Equipe HelpDesk Pro</p>
      </div>
    `;
  }
}
