async function carregarProfessores() {
    const resposta = await fetch("http://localhost:3000/professores");
    const professores = await resposta.json();
    const professoresModalidade1 = professores.filter(professor => {
        const departamento = Number(professor.id_departamento ?? professor.id_departamento  ?? professor.id_departamento  ?? 0);
        return departamento === 1;
    });

    const tabela = document.createElement("table");
    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>${professoresModalidade1.map(professor => `
            <tr>
                <td>${professor.nome ?? ""}</td>
                <td>${professor.email ?? ""}</td>
                <td>${professor.status ?? ""}</td>
            </tr>
        `).join("") || "<tr><td colspan='3'>Nenhum professor encontrado para a modalidade 1.</td></tr>"}</tbody>`;

    const layout = document.querySelector(".layout");
    if (layout) {
        layout.insertBefore(tabela, document.querySelector(".footer"));
    }
}

carregarProfessores().catch(() => {
    const mensagem = document.createElement("p");
    mensagem.textContent = "Não foi possível carregar os professores.";
    const layout = document.querySelector(".layout");
    if (layout) {
        layout.insertBefore(mensagem, document.querySelector(".footer"));
    }
});