/* ==========================================================================
   📝 PROJETO: GERENCIADOR DE TAREFAS CLI
   🎓 INSTITUIÇÃO: Lions Startups (Turma da Noite)
   ==========================================================================
   Descrição: 
   Programa de linha de comando para gerenciamento de tarefas pessoais.
   Os dados são armazenados na memória usando um vetor global de objetos.
   Utiliza exclusivamente o módulo nativo 'readline' do Node.js.

   👥 INTEGRANTES E RESPONSABILIDADES:
   
   1. Henry (Líder / Representante)
      - Tarefas: Setup do repositório Git, gerenciamento das branches e revisão.
      - No Código: Criou o esqueleto inicial, o Menu Principal com recursão 
        e desenvolveu a função "Editar Tarefa" (buscando por índice).

   2. Wesley (Desenvolvedor)
      - No Código: Desenvolveu a função "Adicionar Tarefa", responsável por
        capturar os dados digitados, montar o objeto {lembrete, prazo, concluido} 
        e inseri-lo no vetor global usando o método .push().

   3. Cabelo (Desenvolvedor)
      - No Código: Desenvolveu as funções "Listar Tarefas" e "Concluir Tarefa". 
        Implementou a leitura do vetor usando o método obrigatório .forEach() 
        e a lógica de alteração da flag booleana (concluido: true).

   📚 CONTEÚDOS DE AULA APLICADOS:
   - Funções (Aula Function / Aula CRUD)
   - Arrays e Objetos (Aula Arrays / Aula Objeto)
   - Estruturas de Repetição (Aula Laços - forEach)
   - Condicionais e Lógica (Aula Condicionais)
   ========================================================================== */

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Vetor global de objetos - Armazenamento em memória (Aula Arrays/Objeto)
let tarefas = [];

// ============================================================
// 1. MENU PRINCIPAL - Feito por: HENRY (Líder)
// ============================================================
function exibirMenu() {
    console.log(`
    --- 📝 GERENCIADOR DE TAREFAS ---
    1. Adicionar Tarefa (Wesley)
    2. Listar Tarefas (Cabelo)
    3. Editar Tarefa (Henry)
    4. Marcar como Concluída (Cabelo)
    5. Excluir Tarefa (Wesley)
    6. Sair
    `);

    rl.question('Escolha uma opção: ', (opcao) => {
        switch (opcao) {
            case '1':
                adicionarTarefa();
                break;
            case '2':
                listarTarefas();
                break;
            case '3':
                editarTarefa();
                break;
            case '4':
                concluirTarefa();
                break;
            case '5':
                excluirTarefa();
                break;
            case '6':
                console.log('Encerrando programa... Até logo!');
                rl.close();
                break;
            default:
                console.log('⚠️ Opção inválida! Tente novamente.');
                exibirMenu();
                break;
        }
    });
}

// ============================================================
// 2. ADICIONAR TAREFA - Feito por: WESLEY
// ============================================================
function adicionarTarefa() {
    console.log('\n--- ➕ Adicionar Nova Tarefa ---');
    rl.question('O que precisa ser feito (Lembrete)? ', (lembrete) => {
        rl.question('Qual o prazo (ex: Amanhã, 20/10)? ', (prazo) => {
            
            // Criando o objeto da tarefa (Aula Objeto)
            const novaTarefa = {
                lembrete: lembrete,
                prazo: prazo,
                concluido: false // Inicia sempre como pendente
            };

            // Adicionando ao array (Aula Arrays)
            tarefas.push(novaTarefa);
            
            console.log('✅ Tarefa adicionada com sucesso!');
            exibirMenu();
        });
    });
}

// ============================================================
// 3. LISTAR TAREFAS - Feito por: CABELO
// ============================================================
function listarTarefas() {
    console.log('\n--- 📋 Lista de Tarefas ---');
    
    if (tarefas.length === 0) {
        console.log('Nenhuma tarefa cadastrada até o momento.');
    } else {
        // Uso OBRIGATÓRIO do forEach (Aula Laços)
        tarefas.forEach((t, index) => {
            const status = t.concluido ? '[V] Concluída' : '[ ] Pendente';
            console.log(`${index + 1}. ${status} | Tarefa: ${t.lembrete} | Prazo: ${t.prazo}`);
        });
    }
    exibirMenu();
}

// ============================================================
// 4. EDITAR TAREFA - Feito por: HENRY
// ============================================================
function editarTarefa() {
    if (tarefas.length === 0) {
        console.log('\n⚠️ Não há tarefas para editar.');
        return exibirMenu();
    }

    console.log('\n--- ✏️ Editar Tarefa ---');
    tarefas.forEach((t, i) => console.log(`${i + 1}. ${t.lembrete}`));

    rl.question('\nDigite o número da tarefa que deseja editar: ', (num) => {
        const index = Number(num) - 1;

        if (index >= 0 && index < tarefas.length) {
            rl.question('Novo texto do lembrete: ', (novoTexto) => {
                rl.question('Novo prazo: ', (novoPrazo) => {
                    tarefas[index].lembrete = novoTexto;
                    tarefas[index].prazo = novoPrazo;

                    console.log('✅ Tarefa atualizada!');
                    exibirMenu();
                });
            });
        } else {
            console.log('⚠️ Número inválido!');
            exibirMenu();
        }
    });
}

// ============================================================
// 5. CONCLUIR TAREFA - Feito por: CABELO
// ============================================================
function concluirTarefa() {
    if (tarefas.length === 0) {
        console.log('\n⚠️ Não há tarefas para concluir.');
        return exibirMenu();
    }

    console.log('\n--- ✔ Marcar como Concluída ---');
    tarefas.forEach((t, i) => {
        const status = t.concluido ? '(Já Concluída)' : '';
        console.log(`${i + 1}. ${t.lembrete} ${status}`);
    });

    rl.question('\nDigite o número da tarefa que concluiu: ', (num) => {
        const index = Number(num) - 1;

        if (index >= 0 && index < tarefas.length) {
            tarefas[index].concluido = true;
            console.log('✔ Parabéns! Tarefa marcada como concluída.');
        } else {
            console.log('⚠️ Número inválido!');
        }
        exibirMenu();
    });
}

// ============================================================
// 6. EXCLUIR TAREFA - Feito por: WESLEY
// ============================================================
function excluirTarefa() {
    if (tarefas.length === 0) {
        console.log('\n⚠️ Não há tarefas para excluir.');
        return exibirMenu();
    }

    console.log('\n--- 🗑️ Excluir Tarefa ---');
    tarefas.forEach((t, i) => console.log(`${i + 1}. ${t.lembrete}`));

    rl.question('\nDigite o número da tarefa que deseja REMOVER: ', (num) => {
        const index = Number(num) - 1;

        if (index >= 0 && index < tarefas.length) {
            // Remove 1 elemento na posição 'index' (Aula Arrays)
            tarefas.splice(index, 1);
            console.log('❌ Tarefa removida com sucesso!');
        } else {
            console.log('⚠️ Número inválido!');
        }
        exibirMenu();
    });
}

// Inicialização do Sistema
exibirMenu();