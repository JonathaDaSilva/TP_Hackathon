interface Requisito {
  label: string;
  teste: (senha: string) => boolean;
}

const REQUISITOS: Requisito[] = [
  { label: "Entre 10 e 15 caracteres", teste: (s) => s.length >= 10 && s.length <= 15 },
  { label: "Uma letra maiúscula (A-Z)", teste: (s) => /[A-Z]/.test(s) },
  { label: "Uma letra minúscula (a-z)", teste: (s) => /[a-z]/.test(s) },
  { label: "Um número (0-9)", teste: (s) => /\d/.test(s) },
  { label: "Um caractere especial (ex: ! @ # $ %)", teste: (s) => /[^A-Za-z0-9]/.test(s) },
];

export function passwordAtendeRequisitos(senha: string): boolean {
  return REQUISITOS.every((req) => req.teste(senha));
}

export function PasswordStrength({ senha }: { senha: string }) {
  return (
    <ul className="mt-2 space-y-1">
      {REQUISITOS.map((req) => {
        const atendido = req.teste(senha);
        return (
          <li
            key={req.label}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              atendido ? "text-sage-700" : "text-gray-400"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
              {atendido ? (
                <path
                  fillRule="evenodd"
                  d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4L8.5 12l6.8-6.8a1 1 0 011.4 0z"
                  clipRule="evenodd"
                />
              ) : (
                <circle cx="10" cy="10" r="3" />
              )}
            </svg>
            {req.label}
          </li>
        );
      })}
    </ul>
  );
}
