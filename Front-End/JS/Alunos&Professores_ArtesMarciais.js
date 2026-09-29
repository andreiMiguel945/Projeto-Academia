if(typeof window !== 'undefined' && window.location.pathname.includes('gerenciamentoAlunosArtesMarciais')) {
     carregarAlunos();
}

if(typeof window !== 'undefined' && window.location.pathname.includes('gerenciamentoProfessoresArtesMarciais')) {
    carregarProfessores();
}
     
async function carregarAlunos() {
    const resposta = await fetch("http://localhost:3000/alunos");
    const alunos = await resposta.json();
    const alunosDepartamento2 = (Array.isArray(alunos) ? alunos : []).filter(aluno => Number(aluno.id_departamento) === 2);
    const tabela = document.createElement("table");
    tabela.innerHTML = `
        <tbody>${alunosDepartamento2.map(aluno => `
            <tr>
                <td>${aluno.nome ?? ""}</td>
                <td>${aluno.email ?? ""}</td>
                <td>${aluno.status ?? ""}</td>
                <td>${aluno.nome_modalidade ?? "Sem modalidade"}</td>
            </tr>`).join("") || '<tr><td colspan="5">Nenhum aluno encontrado para o departamento 2.</td></tr>'}</tbody>`;
        document.querySelector(".layout").insertBefore(tabela, document.querySelector(".footer"));
}

    
async function carregarProfessores() {
    const resposta = await fetch("http://localhost:3000/professores");
    const professores = await resposta.json();
    const professoresModalidade2 = professores.filter(professor => {
        const departamento = Number(professor.id_departamento ?? professor.id_departamento  ?? professor.id_departamento  ?? 0);
        return departamento === 2;
    });

    const tabela = document.createElement("table");
    tabela.innerHTML = `
    
        <tbody>${professoresModalidade2.map(professor => `
            <tr>
                <td>${professor.nome ?? ""}</td>
                <td>${professor.email ?? ""}</td>
            </tr>
        `).join("") || "<tr><td colspan='3'>Nenhum professor encontrado para a modalidade 2.</td></tr>"}</tbody>`;

    const layout = document.querySelector(".layout");
    if (layout) {
        layout.insertBefore(tabela, document.querySelector(".footer"));
    }
}

