if(typeof window !== 'undefined' && window.location.pathname.includes('gerenciamentoAlunosAcademia')) {
    carregarAlunos();
}
if(typeof window !== 'undefined' && window.location.pathname.includes('gerenciamentoProfessoresAcademia')) {
    carregarProfessores();
}
async function carregarAlunos() {
        const resposta = await fetch("http://localhost:3000/alunos");
        const alunos = await resposta.json();
        const alunosDepartamento1 = (Array.isArray(alunos) ? alunos : []).filter(aluno => Number(aluno.id_departamento) === 1);
        const tabela = document.createElement("table");
        tabela.innerHTML = `
            <tbody>${alunosDepartamento1.map(aluno => `
                <tr>
                    <td>${aluno.nome ?? ""}</td>
                    <td>${aluno.email ?? ""}</td>
                    <td>${aluno.status ?? ""}</td>
                    <td>${aluno.nome_modalidade ?? "Sem modalidade"}</td>
                </tr>`).join("") || '<tr><td colspan="5">Nenhum aluno encontrado para o departamento 1.</td></tr>'}</tbody>`;
            document.querySelector(".layout").insertBefore(tabela, document.querySelector(".footer"));
    }


//professores
    async function carregarProfessores() {
        const resposta = await fetch("http://localhost:3000/professores");
        const professores = await resposta.json();
        const professoresModalidade1 = professores.filter(professor => {
            const departamento = Number(professor.id_departamento ?? professor.id_departamento  ?? professor.id_departamento  ?? 0);
            return departamento === 1;
        });

        const tabela = document.createElement("table");
        tabela.innerHTML = `
        
            <tbody>${professoresModalidade1.map(professor => `
                <tr>
                    <td>${professor.nome ?? ""}</td>
                    <td>${professor.email ?? ""}</td>
                </tr>
            `).join("") || "<tr><td colspan='3'>Nenhum professor encontrado para a modalidade 1.</td></tr>"}</tbody>`;

        const layout = document.querySelector(".layout");
        if (layout) {
            layout.insertBefore(tabela, document.querySelector(".footer"));
        }
    }

 


        