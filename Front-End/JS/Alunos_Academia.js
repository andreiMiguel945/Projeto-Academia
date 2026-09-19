      async function carregarAlunos() {
            const resposta = await fetch("http://localhost:3000/alunos");
            const alunos = await resposta.json();
            const alunosDepartamento1 = (Array.isArray(alunos) ? alunos : []).filter(aluno => Number(aluno.id_departamento) === 1);
            const tabela = document.createElement("table");
            tabela.innerHTML = `
                <tbody>${alunosDepartamento1.map(aluno => `
                    <tr>
                        <td>${aluno.id ?? ""}</td>
                        <td>${aluno.nome ?? ""}</td>
                        <td>${aluno.email ?? ""}</td>
                        <td>${aluno.status ?? ""}</td>
                        <td>${aluno.nome_modalidade ?? "Sem modalidade"}</td>
                    </tr>`).join("") || '<tr><td colspan="5">Nenhum aluno encontrado para o departamento 1.</td></tr>'}</tbody>`;
            document.querySelector(".layout").insertBefore(tabela, document.querySelector(".footer"));
        }

        carregarAlunos().catch(() => {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Não foi possível carregar os alunos.";
            document.querySelector(".layout").insertBefore(mensagem, document.querySelector(".footer"));
        });