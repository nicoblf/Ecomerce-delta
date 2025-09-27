// Arquivo: /src/components/Footer.tsx

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-zinc-900 text-zinc-400">
      <div className="container mx-auto py-6 text-center">
        <p>&copy; {currentYear} DeltaChronos. Todos os direitos reservados.</p>
        <p className="text-xs mt-2">Uma marca construída com tecnologia de ponta.</p>
      </div>
    </footer>
  )
}