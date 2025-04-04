import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15"];

export default function OrcamentoPessoal() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("renda");

  const adicionarTransacao = () => {
    if (!descricao || !valor) return;
    const nova = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      tipo,
    };
    setTransacoes([...transacoes, nova]);
    setDescricao("");
    setValor("");
  };

  const totalRenda = transacoes.filter(t => t.tipo === "renda").reduce((acc, t) => acc + t.valor, 0);
  const totalDespesas = transacoes.filter(t => t.tipo === "despesa").reduce((acc, t) => acc + t.valor, 0);
  const saldo = totalRenda - totalDespesas;

  const dadosGrafico = [
    { name: "Renda", value: totalRenda },
    { name: "Despesas", value: totalDespesas },
  ];

  return (
    <div>
      <h1>Orçamento Pessoal</h1>
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <input placeholder="Valor" type="number" value={valor} onChange={e => setValor(e.target.value)} />
      <select value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="renda">Renda</option>
        <option value="despesa">Despesa</option>
      </select>
      <button onClick={adicionarTransacao}>Adicionar</button>

      <h2>Renda: R$ {totalRenda.toFixed(2)}</h2>
      <h2>Despesas: R$ {totalDespesas.toFixed(2)}</h2>
      <h2>Saldo: R$ {saldo.toFixed(2)}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dadosGrafico}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={dadosGrafico} dataKey="value" nameKey="name" outerRadius={100} label>
            {dadosGrafico.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <ul>
        {transacoes.map((t) => (
          <li key={t.id}>
            {t.descricao} - R$ {t.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
