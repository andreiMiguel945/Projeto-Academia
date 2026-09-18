      async function carregarAlunos() {
            const resposta = await fetch("http://localhost:3000/alunos");
            const alunos = await resposta.json();
            const tabela = document.createElement("table");
            tabela.innerHTML = `
                <tbody>${alunos.map(aluno => `
                    <tr>
                        <td>${aluno.id ?? ""}</td>
                        <td>${aluno.nome ?? ""}</td>
                        <td>${aluno.email ?? ""}</td>
                        <td>${aluno.status ?? ""}</td>
                    </tr>`).join("")}</tbody>`;
            document.querySelector(".layout").insertBefore(tabela, document.querySelector(".footer"));
        }

        carregarAlunos().catch(() => {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Não foi possível carregar os alunos.";
            document.querySelector(".layout").insertBefore(mensagem, document.querySelector(".footer"));
        });