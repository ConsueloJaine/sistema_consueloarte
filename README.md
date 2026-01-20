🌸 Consuelo & Arte Corporal | Studio
Este é um sistema web completo desenvolvido para a gestão de um estúdio de tatuagem e piercing com estética botânica. O projeto une a funcionalidade administrativa (gestão de estoque, insumos e reservas) com a
experiência do cliente (catálogo e portfólio dinâmico).

🚀 Funcionalidades Principais
Administrativo (Área Restrita)
Acesso por Senha: Proteção de área restrita para o profissional através de autenticação simples.

Controle de Estoque de Joias: Cadastro, edição e exclusão de itens com suporte a upload de imagens via File API.

Gestão de Insumos (Materiais): Painel dedicado para controle de quantidades de materiais descartáveis (agulhas, tintas, luvas) com ajuste rápido de estoque.

Sistema de Reservas: Vínculo de peças do estoque a clientes específicos com data marcada, reduzindo automaticamente a quantidade disponível.

Experiência do Cliente (Público)
Catálogo Dinâmico: Vitrine de joias renderizada em tempo real a partir dos dados do sistema.

Portfólio "Feed Style": Galeria de trabalhos realizados com descrições e valores integrados.

Botão de Reserva WhatsApp: Integração direta que gera mensagens personalizadas com o nome da joia escolhida.

Sistema de Feedbacks: Mural de avaliações onde clientes podem enviar fotos e notas, com persistência de dados.

🛠️ Tecnologias Utilizadas (Requisitos Técnicos)
O projeto foi construído seguindo rigorosamente as boas práticas de desenvolvimento:

HTML5 Semântico: Uso de tags estruturais para acessibilidade e SEO.

CSS3 Moderno: Design responsivo (Mobile-First) utilizando CSS Grid e Flexbox para alinhamento e organização.

JavaScript (ES6+):

Manipulação de DOM: Inserção, remoção e atualização de nós dinamicamente para uma experiência SPA (Single Page Application).

Persistência (Web Storage): Uso de localStorage para manter o estoque, reservas, insumos e feedbacks salvos no navegador.

Manipulação de Arquivos (File API): Uso de FileReader para converter fotos enviadas pelo usuário em strings Base64 para armazenamento.

Métodos de Array: Implementação de .forEach(), .find(), .unshift() e .splice() para gestão inteligente dos dados.

Arrow Functions: Utilizadas em manipuladores de eventos e funções anônimas para um código mais limpo.

🎨 Identidade Visual
A estética do projeto foi pensada para refletir um estúdio botânico e sofisticado:

Paleta de Cores: Terracota (#B33F40), Dourado (#C5A059) e tons pastéis para um ambiente acolhedor.

Tipografia: Playfair Display para títulos (elegância) e Poppins para leitura (modernidade).

📖 Estrutura do Projeto
Para o correto funcionamento, os arquivos estão organizados da seguinte forma:

index.html: Estrutura principal e seções do sistema.

estilo.css: Estilização completa e media queries para dispositivos móveis.

app.js: Lógica de negócio, manipulação do DOM e persistência.

img.img/: Pasta contendo os ativos visuais e fotos de portfólio.

Desenvolvido por: Jaíne Consuelo Lopes Fernandes

Curso: Sistemas para Internet

Disciplina: Programação Básica para Web
