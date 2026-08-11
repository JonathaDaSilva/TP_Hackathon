import { forwardRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { IconEye, IconEyeOff } from "./icons";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Campo de senha com botão de "olhinho" pra alternar entre texto oculto e
 * visível. Usado no Login e no Cadastro — mesmo campo, mesmo comportamento.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className, ...props },
  ref
) {
  const [visivel, setVisivel] = useState(false);

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        type={visivel ? "text" : "password"}
        className={`w-full rounded-md border border-gray-200 px-3 py-2 pr-10 focus:border-sage-600 focus:outline-none ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setVisivel((atual) => !atual)}
        aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={visivel}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sage-700"
      >
        {visivel ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
});
