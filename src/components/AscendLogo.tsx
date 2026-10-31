import React from 'react';

interface AscendLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  mottoText?: boolean;
}

export const AscendLogo: React.FC<AscendLogoProps> = ({
  className = '',
  size = 40,
  showText = false,
  mottoText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Isotipo: Cubo isométrico 3D de dos niveles con gradiente cálido (ámbar a violeta), cavidad central en rombo hueco y laterales en púrpura sobrio */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-[0_4px_16px_rgba(217,119,6,0.25)]"
      >
        <defs>
          {/* Gradiente superior cálido (ámbar a violeta) */}
          <linearGradient id="ascendTopGradient" x1="15" y1="15" x2="85" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />    {/* Ámbar luminoso */}
            <stop offset="45%" stopColor="#EC4899" />   {/* Rosa cálido */}
            <stop offset="100%" stopColor="#8B5CF6" />  {/* Violeta */}
          </linearGradient>

          {/* Gradiente nivel interior (cavidad central en rombo hueco) */}
          <linearGradient id="ascendInnerGradient" x1="50" y1="35" x2="50" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E1065" />    {/* Púrpura muy profundo */}
            <stop offset="100%" stopColor="#0F172A" />   {/* Fondo de cavidad */}
          </linearGradient>

          {/* Lateral izquierdo: Púrpura sobrio mate */}
          <linearGradient id="ascendLeftFacet" x1="10" y1="45" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#581C87" />    {/* Púrpura 900 */}
            <stop offset="100%" stopColor="#3B0764" />   {/* Púrpura 950 sobrio */}
          </linearGradient>

          {/* Lateral derecho: Púrpura sobrio con sombra controlada */}
          <linearGradient id="ascendRightFacet" x1="50" y1="90" x2="90" y2="45" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4C1D95" />    {/* Púrpura medio */}
            <stop offset="100%" stopColor="#2E1065" />   {/* Púrpura oscuro */}
          </linearGradient>

          {/* Bisel del segundo nivel inferior */}
          <linearGradient id="ascendBaseLeft" x1="18" y1="65" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#240A42" />
            <stop offset="100%" stopColor="#17032D" />
          </linearGradient>

          <linearGradient id="ascendBaseRight" x1="50" y1="95" x2="82" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#310D5C" />
            <stop offset="100%" stopColor="#1E0738" />
          </linearGradient>

          {/* Resplandor sutil en la cavidad del rombo hueco */}
          <linearGradient id="ascendCavityEdge" x1="35" y1="38" x2="65" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Nivel 2 (Plataforma base inferior) */}
        <polygon points="12,62 50,84 50,96 12,74" fill="url(#ascendBaseLeft)" />
        <polygon points="50,84 88,62 88,74 50,96" fill="url(#ascendBaseRight)" />
        <polygon points="12,62 50,40 88,62 50,84" fill="#1E1B4B" opacity="0.6" />

        {/* Lateral izquierdo del bloque superior (Púrpura sobrio) */}
        <polygon points="12,38 50,60 50,84 12,62" fill="url(#ascendLeftFacet)" />

        {/* Lateral derecho del bloque superior (Púrpura sobrio contrastado) */}
        <polygon points="50,60 88,38 88,62 50,84" fill="url(#ascendRightFacet)" />

        {/* Cara superior principal con gradiente cálido (Ámbar a Violeta) y corte isométrico con cavidad central */}
        <path
          d="M 50,14 L 88,36 L 50,58 L 12,36 Z M 50,48 L 68,36 L 50,24 L 32,36 Z"
          fill="url(#ascendTopGradient)"
          fillRule="evenodd"
        />

        {/* Paredes interiores de la cavidad hueca del rombo */}
        {/* Pared interior izquierda de la cavidad */}
        <polygon points="32,36 50,48 50,53 32,41" fill="#431407" opacity="0.85" />
        {/* Pared interior derecha de la cavidad */}
        <polygon points="50,48 68,36 68,41 50,53" fill="#3B0764" opacity="0.9" />
        {/* Fondo del rombo hueco */}
        <polygon points="32,41 50,53 68,41 50,30" fill="url(#ascendInnerGradient)" />

        {/* Línea de luz superior de precisión */}
        <path
          d="M 12,36 L 50,14 L 88,36"
          stroke="#FDE68A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />

        {/* Borde del rombo hueco interior con resplandor cálido */}
        <path
          d="M 32,36 L 50,24 L 68,36 L 50,48 Z"
          stroke="url(#ascendCavityEdge)"
          strokeWidth="1"
          fill="none"
        />

        {/* Arista central vertical */}
        <line x1="50" y1="60" x2="50" y2="84" stroke="#6B21A8" strokeWidth="1.5" strokeOpacity="0.4" />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold tracking-tight text-white leading-none text-xl">
            Ascend <span className="text-white font-semibold">Finance</span>
          </span>
          {mottoText && (
            <span className="text-[11px] text-slate-400 tracking-wide font-normal mt-1 leading-tight">
              Infrastructure for Digital Assets. Built for Real-World Finance.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
