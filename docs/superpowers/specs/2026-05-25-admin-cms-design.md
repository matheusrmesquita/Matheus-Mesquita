# Design Spec: Área Admin + CMS Leve — BRAND

**Data:** 2026-05-25
**Status:** Aprovado

---

## 1. Visão Geral

Adicionar uma área administrativa ao portal BRAND (React + Vite + Tailwind) que permita publicar novos artigos e projetos sem alterar o design público, a estrutura atual ou os conteúdos existentes.

**Persistência:** Supabase (Auth + Database + Storage)
**Idioma do conteúdo novo:** Apenas Português (pt-BR)
**Usuários admin:** Um único usuário, credenciais configuradas direto no Supabase Dashboard

---

## 2. Princípios Inegociáveis

- Nenhum conteúdo existente (artigos hardcoded, projetos hardcoded) é removido ou alterado
- O design público permanece idêntico — zero alterações em CSS, componentes ou páginas públicas
- O acesso admin é discreto e não interfere na experiência do visitante
- Performance do site não é degradada (Supabase fetch só ocorre nas páginas de listagem)

---

## 3. Arquitetura

```
┌─────────────────────────────────────────────────────┐
│  SITE PÚBLICO (React + Vite)                        │
│  Rotas públicas atuais — sem alteração              │
│  /artigos e /projetos leem do Supabase via hook     │
└──────────────────────┬──────────────────────────────┘
                       │ fetch()
┌──────────────────────▼──────────────────────────────┐
│  SUPABASE                                           │
│  Auth     → sessão admin (email + senha)            │
│  Database → tabelas: articles, projects             │
│  Storage  → imagens de capa e galeria               │
└──────────────────────┬──────────────────────────────┘
                       │ protegido por sessão
┌──────────────────────▼──────────────────────────────┐
│  ÁREA ADMIN (/login, /admin/...)                    │
│  Formulário de artigo + formulário de projeto       │
│  Upload de imagens para Supabase Storage            │
└─────────────────────────────────────────────────────┘
```

### O que muda no site público

| Arquivo | Mudança |
|---|---|
| `src/pages/Articles.jsx` | Mescla artigos hardcoded + artigos do Supabase (status=published), ordenados por data |
| `src/pages/Projects.jsx` | Mescla projetos hardcoded + projetos do Supabase |
| `src/pages/ProjectDetails.jsx` | Adaptado para aceitar dados dinâmicos do Supabase além dos hardcoded |
| `src/components/layout/Navbar.jsx` | Adiciona ícone de cadeado discreto à esquerda do botão Contato |
| `src/App.jsx` | Novas rotas: `/login`, `/admin`, `/admin/artigos/*`, `/admin/projetos/*` |

### O que NÃO muda

- `src/constants/articles.js` — permanece com os 2 artigos atuais
- `src/constants/projects.js` — permanece com os 11 projetos atuais
- `ArticleSearch.jsx` e `ArticleEducation.jsx` — rotas fixas, sem alteração
- Todo CSS, design system e componentes públicos

---

## 4. Modelo de Dados (Supabase)

### Tabela `articles`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK, auto-gerado |
| `title` | text | Título do artigo |
| `slug` | text, unique | URL: `/artigos/{slug}` |
| `excerpt` | text | Resumo para o card na listagem |
| `cover_type` | text | Classe CSS: `cover-orbita` \| `cover-meridian` |
| `category` | text | Ex: "Estudo de Caso", "Artigo" |
| `tags` | text[] | Ex: `["2026", "UX Design"]` |
| `intro_highlight` | text | Primeiro parágrafo em destaque |
| `intro_sub` | text | Segundo parágrafo da introdução |
| `sections` | jsonb | Array de seções (ver estrutura abaixo) |
| `status` | text | `draft` \| `published` |
| `created_at` | timestamptz | Data de publicação |

**Estrutura de uma seção (item do array `sections`):**

```json
{
  "icon": "Target",
  "title": "1. Título da Seção",
  "paragraphs": ["Parágrafo 1", "Parágrafo 2"],
  "callout": {
    "type": "amber",
    "label": "Percepção chave",
    "text": "Texto do callout"
  }
}
```

O campo `callout` é opcional.

**Ícones disponíveis (Lucide):** Target, Users, Activity, Landmark, Award, BookOpen, Compass, AlertCircle, Cpu, ClipboardList

### Tabela `projects`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | Nome do projeto |
| `slug` | text, unique | URL: `/projetos/{slug}` |
| `description` | text | Descrição para o card |
| `category` | text | Ex: "UI Design" |
| `tags` | text[] | Tags do projeto |
| `cover_image_url` | text | URL no Supabase Storage |
| `gallery_urls` | text[] | Array de URLs de imagens |
| `status` | text | `draft` \| `published` |
| `created_at` | timestamptz | Data |

---

## 5. Estrutura de Rotas

### Públicas (sem alteração)
```
/                    → Home
/sobre               → Sobre
/projetos            → Projects
/projetos/:id        → ProjectDetails
/artigos             → Articles
/artigos/busca       → ArticleSearch (hardcoded)
/artigos/dxp-educacao → ArticleEducation (hardcoded)
```

### Novas rotas públicas
```
/artigos/:slug       → ArticleTemplate (dinâmico — artigos do Supabase)
```

### Área admin (protegidas por sessão Supabase)
```
/login
/admin               → Dashboard (contadores + ações rápidas)
/admin/artigos       → Listagem de artigos
/admin/artigos/novo  → Editor de artigo
/admin/artigos/:id   → Editor de artigo (edição)
/admin/projetos      → Listagem de projetos
/admin/projetos/novo → Formulário de projeto
/admin/projetos/:id  → Formulário de projeto (edição)
```

---

## 6. Estrutura de Arquivos Novos

```
src/
├── lib/
│   └── supabase.js              ← cliente Supabase
│
├── hooks/
│   ├── useArticles.js           ← fetch artigos do Supabase
│   └── useProjects.js           ← fetch projetos do Supabase
│
├── contexts/
│   └── AuthContext.jsx          ← sessão Supabase Auth
│
├── pages/
│   ├── Login.jsx                ← /login
│   └── ArticleTemplate.jsx     ← /artigos/:slug (dinâmico)
│
└── pages/admin/
    ├── AdminLayout.jsx          ← wrapper com sidebar
    ├── Dashboard.jsx            ← /admin
    ├── ArticlesList.jsx         ← /admin/artigos
    ├── ArticleEditor.jsx        ← /admin/artigos/novo e /:id
    ├── ProjectsList.jsx         ← /admin/projetos
    └── ProjectForm.jsx          ← /admin/projetos/novo e /:id
```

---

## 7. Design da Área Admin

### Login (`/login`)
- Fundo `#050505`, card centralizado com glassmorphism (`backdrop-blur`, `bg-white/3`, borda `white/8`)
- Logo BRAND + label "ÁREA ADMINISTRATIVA"
- Campos: Email + Senha
- Botão "Entrar" com cor `#FF5A1F`
- Sem nenhuma indicação pública de que é área administrativa

### Ícone no Header
- Ícone `<Lock size={14} />` (Lucide) posicionado à esquerda do botão Contato
- Cor: `rgba(255,255,255,0.25)` — quase invisível
- Hover: `rgba(255,255,255,0.6)` — acende levemente
- Link para `/login`
- No mobile: item discreto no menu hamburguer

### Painel Admin — Layout Geral
- **Sidebar fixa** (esquerda, 160px): logo BRAND/ADMIN + links de navegação + botão Sair
- **Área principal** (resto): conteúdo da rota ativa
- Estética: dark premium, mesma paleta do site (`#050505`, `#0d0d0d`, bordas `white/6`, accent `#FF5A1F`)

### Editor de Artigo (`ArticleEditor.jsx`)
Layout de 3 colunas dentro da área principal:

**Coluna central (editor):**
- Header com breadcrumb "← Artigos" + botões "Salvar rascunho" / "Publicar"
- Bloco fixo de Introdução: `intro_highlight` + `intro_sub`
- Lista de seções expansíveis — cada seção contém:
  - Seletor de ícone (dropdown com os 10 ícones disponíveis)
  - Campo de título
  - Campos de parágrafos com botão "+ parágrafo"
  - Callout opcional: tipo (amber/accent/final) + label + texto + botão remover
- Seção colapsada exibe resumo: "2 parágrafos · callout amber"
- Botão "+ Adicionar seção" no final

**Coluna direita (metadados):**
Título, slug (auto-gerado a partir do título), excerpt, tipo de capa (dropdown), categoria, tags e data.

### Formulário de Projeto (`ProjectForm.jsx`)
Formulário simples (sem divisão em colunas):
- Título, slug, descrição, categoria, tags
- Upload de imagem de capa → Supabase Storage
- Upload múltiplo de galeria → Supabase Storage (array de URLs)
- Botões: Salvar rascunho / Publicar

---

## 8. Comportamento do Site Público com Conteúdo Novo

### Página `/artigos`
O hook `useArticles()` busca artigos com `status = 'published'` do Supabase. A página exibe a lista combinada: artigos hardcoded do `articles.js` + artigos do Supabase, ordenados por `created_at` decrescente.

### Rota dinâmica `/artigos/:slug`
O componente `ArticleTemplate.jsx` renderiza qualquer artigo do Supabase usando as **mesmas classes CSS** dos artigos existentes:
- Hero com `pd-hero`, `pd-hero-title`, `pd-hero-tags`, capa pelo `cover_type`
- Intro com `ar-intro-block`, `ar-intro-highlight`, `ar-intro-sub`
- Seções com `ar-section`, `ar-section-header`, `ar-section-icon`, `ar-body`
- Callouts com `ar-callout`, `ar-callout-amber`, `ar-callout-accent`, `ar-callout-final`
- CTA strip ao final (idêntico aos artigos existentes)

### Página `/projetos`
Mesma lógica: mescla projetos hardcoded + projetos do Supabase.

### Rota `/projetos/:id`
`ProjectDetails.jsx` já recebe dados via `constants/projects.js`. Será adaptado com a seguinte lógica de lookup: primeiro busca o projeto pelo `id` nos dados hardcoded; se não encontrado, busca pelo `slug` na tabela `projects` do Supabase. Isso preserva todas as URLs existentes e suporta os novos projetos sem conflito.

---

## 9. Segurança

- Todas as rotas `/admin/*` verificam sessão Supabase — redirecionam para `/login` se não autenticado
- `ProtectedRoute` wrapper em volta de todas as rotas admin no `App.jsx`
- Supabase RLS (Row Level Security) habilitado: apenas usuário autenticado pode fazer INSERT/UPDATE
- Leituras públicas (SELECT com `status = 'published'`) liberadas para anônimos

---

## 10. Critérios de Aceite

| Critério | Resultado Esperado |
|---|---|
| Login com credenciais corretas | Redireciona para `/admin` |
| Login com credenciais erradas | Exibe mensagem de erro |
| Acesso a `/admin` sem login | Redireciona para `/login` |
| Criar artigo e publicar | Aparece em `/artigos` com layout idêntico aos existentes |
| Salvar rascunho | Não aparece no site público |
| Criar projeto e publicar | Aparece em `/projetos` |
| Editar artigo existente | Altera conteúdo em tempo real após publicação |
| Artigos hardcoded | Permanecem visíveis e inalterados |
| Projetos hardcoded | Permanecem visíveis e inalterados |
| Build (`vite build`) | Sem erros |
| Header público | Ícone discreto à esquerda do botão Contato |
