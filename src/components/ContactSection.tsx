import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { COMPANY_DATA } from '../data/companyData.js';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    interest: 'Comprar veículo',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    setIsSubmitted(true);
  };

  const getWhatsAppForwardUrl = () => {
    const text = encodeURIComponent(
      `Olá Dutra Automóveis! Meu nome é ${formData.name}.\n` +
        `• Telefone/WhatsApp: ${formData.phone}\n` +
        `• Interesse: ${formData.interest}\n` +
        (formData.message ? `• Mensagem: ${formData.message}` : '')
    );
    return `${COMPANY_DATA.whatsappUrl}?text=${text}`;
  };

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="py-24 bg-zinc-950 relative border-t border-zinc-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-zinc-400">
            Fale com a Nossa Equipe
          </span>
          <h2
            id="contato-title"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Entre em Contato
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Estamos prontos para atender você com toda a dedicação, seja para
            adquirir seu próximo automóvel, avaliar seu usado ou tirar dúvidas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-16">
          {/* Contact Information & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-zinc-900/70 border border-white/10 space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white">
                Canais de Atendimento
              </h3>

              <div className="space-y-5">
                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      WhatsApp Oficial
                    </span>
                    <a
                      href={COMPANY_DATA.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Conversar no WhatsApp ${COMPANY_DATA.phoneFormatted}`}
                      className="text-base font-bold text-white hover:text-emerald-400 transition-colors inline-block"
                    >
                      {COMPANY_DATA.phoneFormatted}
                    </a>
                    <p className="text-xs text-zinc-500">
                      Atendimento rápido e envio imediato de fotos e propostas.
                    </p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Telefone da Loja
                    </span>
                    <a
                      href={`tel:${COMPANY_DATA.phoneRaw}`}
                      aria-label={`Ligar para o telefone ${COMPANY_DATA.phoneFormatted}`}
                      className="text-base font-bold text-white hover:text-zinc-300 transition-colors inline-block"
                    >
                      {COMPANY_DATA.phoneFormatted}
                    </a>
                  </div>
                </div>

                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Endereço da Loja
                    </span>
                    <a
                      href={COMPANY_DATA.mapsPlaceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Ver endereço da Dutra Automóveis no Google Maps"
                      className="text-sm font-medium text-white hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{COMPANY_DATA.address}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Horários */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                      Horário de Funcionamento
                    </span>
                    <p className="text-sm text-zinc-200">{COMPANY_DATA.hours}</p>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="pt-6 border-t border-white/10">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-3">
                  Siga a Dutra Automóveis
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={COMPANY_DATA.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Perfil da Dutra Automóveis no Instagram"
                    className="flex items-center gap-2 py-2 px-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span>@dutraautomoveissm</span>
                  </a>

                  <a
                    href={COMPANY_DATA.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Página da Dutra Automóveis no Facebook"
                    className="flex items-center gap-2 py-2 px-4 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Lead Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/60 border border-white/10 shadow-2xl relative">
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Envie uma Mensagem
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-8">
                Preencha seus dados para que um de nossos consultores entre em contato com exclusividade.
              </p>

              {isSubmitted ? (
                <div className="py-10 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-white">
                    Mensagem Recebida com Sucesso!
                  </h4>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto">
                    Obrigado, <strong className="text-white">{formData.name}</strong>. Nossa equipe entrará em contato em breve através do número informado.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppForwardUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Continuar conversa direto no WhatsApp da Dutra Automóveis"
                      className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Continuar no WhatsApp Agora</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          interest: 'Comprar veículo',
                          message: '',
                        });
                      }}
                      className="py-3 px-5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nome */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold text-zinc-300"
                      >
                        Nome Completo <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 text-xs sm:text-sm bg-zinc-950 text-white placeholder-zinc-500 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>

                    {/* Telefone / WhatsApp */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="text-xs font-semibold text-zinc-300"
                      >
                        Telefone / WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        placeholder="(55) 99999-9999"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 text-xs sm:text-sm bg-zinc-950 text-white placeholder-zinc-500 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tipo de Interesse */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-interest"
                      className="text-xs font-semibold text-zinc-300"
                    >
                      Assunto de Interesse
                    </label>
                    <select
                      id="contact-interest"
                      value={formData.interest}
                      onChange={(e) =>
                        setFormData({ ...formData, interest: e.target.value })
                      }
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-zinc-950 text-white border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors cursor-pointer"
                    >
                      <option value="Comprar veículo">Quero comprar um veículo</option>
                      <option value="Vender meu carro">Quero vender meu veículo usado</option>
                      <option value="Troca com troco">Desejo fazer uma troca (com ou sem troco)</option>
                      <option value="Financiamento">Dúvidas sobre financiamento e taxas</option>
                      <option value="Consultoria">Consultoria / Encomendar modelo específico</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold text-zinc-300"
                    >
                      Mensagem Adicional (Opcional)
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder="Conte mais sobre o modelo de interesse ou condições que busca..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 text-xs sm:text-sm bg-zinc-950 text-white placeholder-zinc-500 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm py-3.5 px-8 rounded-xl transition-all shadow-xl hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Google Map */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                Como Chegar à Dutra Automóveis
              </h3>
              <p className="text-xs text-zinc-400">
                Ponto estratégico no Centro de Santa Maria, de fácil acesso e com vaga para clientes.
              </p>
            </div>
            <a
              href={COMPANY_DATA.mapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir rotas para a Dutra Automóveis no aplicativo Google Maps"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
            >
              <span>Abrir Rotas no Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
            <iframe
              title="Localização da Dutra Automóveis no Google Maps em Santa Maria RS"
              src={COMPANY_DATA.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(105%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
