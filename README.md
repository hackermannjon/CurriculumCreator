# Gerador de Currículo em PDF v1.0

## O que é isto?

Bem-vindo! Esta é uma ferramenta simples para criar um currículo profissional em formato PDF de forma rápida e fácil. Você só precisa editar um arquivo de texto com suas informações e executar o programa. Ele cuidará de todo o design e formatação para você!

## Como Usar (Guia Rápido)

Siga estes 3 passos simples:

1.  **Edite o Arquivo de Texto**: Abra a pasta `inputs` e edite o arquivo `exemplo_curriculo.json` com suas informações pessoais. Use um editor de texto simples como o Bloco de Notas (Windows) ou TextEdit (Mac).
2.  **Execute o Programa**: Dê um duplo clique no arquivo `gerador.bat`. Uma tela preta aparecerá por alguns segundos e depois se fechará sozinha. Isso é normal!
3.  **Pegue seu PDF**: Vá para a pasta `outputs`. Seu currículo em PDF estará lá, pronto para ser enviado!

---

## Entendendo o Arquivo `exemplo_curriculo.json` (Guia Detalhado)

O arquivo `exemplo_curriculo.json` é o seu formulário. Você deve substituir os textos de exemplo pelos seus dados. Mantenha as aspas `"` e as vírgulas `,` exatamente como estão.

-   **`fullName`**: Seu nome completo.
-   **`jobTitle`**: Seu cargo ou área de atuação (ex: "Advogado", "Designer Gráfico").
-   **`contact`**:
    -   **`linkedin`**: O link completo para seu perfil (ex: `linkedin.com/in/seu-usuario-aqui`).
    -   **`github`**: O link completo para seu perfil do GitHub (ex: `github.com/seu-usuario`). Se não tiver, pode deixar em branco.
    -   **`location`**: Sua cidade e estado.
    -   **`email`**: Seu endereço de e-mail.
-   **`summary`**: Um parágrafo curto sobre você. Sua apresentação profissional.
-   **`skills`**: Suas habilidades. Você pode adicionar ou remover itens.
    -   **`category`**: O tipo de habilidade (ex: "Idiomas", "Software", "Certificações").
    -   **`list`**: A lista de habilidades para aquela categoria.
-   **`experience`**: Suas experiências profissionais. Comece da mais recente para a mais antiga. Para adicionar mais uma, copie e cole um bloco inteiro, desde `{` até `}`.
    -   **`role`**: O nome do cargo que você ocupou (ex: "Analista Financeiro"). O texto "(Experiência 1)" é apenas um guia.
    -   **`company`**: O nome da empresa.
    -   **`location`**: O local da empresa.
    -   **`period`**: A data de início e fim.
    -   **`description`**: Uma lista de suas realizações. Cada frase deve estar entre aspas e separada por vírgula.
    -   **`links` (Opcional)**: Se quiser linkar para um projeto específico daquela experiência, use este campo. Se não, pode apagar toda a linha de `links`.
-   **`education`**: Sua formação acadêmica.
    -   **`institution`**: Nome da faculdade/escola.
    -   **`degree`**: Nome do curso.
    -   **`graduation`**: Data de formatura.
-   **`languages`**: Idiomas que você fala.
    -   **`language`**: O nome do idioma.
    -   **`proficiency`**: Seu nível de fluência (ex: "Básico", "Fluente", "Nativo").

Se tiver qualquer problema, basta apagar o arquivo que você editou e usar uma cópia nova do `exemplo_curriculo.json` para recomeçar.
