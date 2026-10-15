"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { Lesson } from "@/lib/catalog";

const products = [
  { id: "sensor", name: "Sensor de luz", category: "Sensores" },
  { id: "placa", name: "Placa de controle", category: "Controladores" },
  { id: "motor", name: "Motor de demonstração", category: "Atuadores" },
];

function FormDemo() {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  function reset() {
    setName("");
    setEmail("");
    setMessage("");
    setSuccess(false);
  }
  return (
    <>
      <h4>Formulário de interesse</h4>
      <p>Inscrição fictícia: nada é enviado ou salvo. Use os dados de exemplo.</p>
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          setSuccess(false);
          if (!name.trim()) {
            setMessage("Preencha o nome para continuar.");
            return;
          }
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setMessage("Confira o formato do e-mail: nome@dominio.");
            return;
          }
          setSuccess(true);
          setMessage("Inscrição simulada concluída. Nenhuma conta real foi criada.");
        }}
      >
        <label htmlFor={`${id}-name`}>Nome de exemplo</label>
        <input
          id={`${id}-name`}
          value={name}
          maxLength={80}
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
          aria-describedby={`${id}-status`}
        />
        <label htmlFor={`${id}-email`}>E-mail de exemplo</label>
        <input
          id={`${id}-email`}
          type="email"
          value={email}
          maxLength={254}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={`${id}-status`}
        />
        <div className="demo-actions">
          <button type="submit" className="button primary">
            Enviar exemplo
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              setName("Ana de exemplo");
              setEmail("ana@example.test");
              setMessage("");
            }}
          >
            Preencher exemplo
          </button>
          <button type="button" className="button secondary" onClick={reset}>
            Reiniciar exemplo
          </button>
        </div>
      </form>
      <p id={`${id}-status`} role={success ? "status" : "alert"}>
        {message}
      </p>
    </>
  );
}

function CatalogDemo() {
  const id = useId();
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const visible = products.filter((product) =>
    product.name.toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR")),
  );
  return (
    <>
      <h4>Vitrine de componentes</h4>
      <p>Filtro e carrinho funcionais com itens fictícios. Não há compra nem pagamento.</p>
      <label htmlFor={id}>Buscar componentes</label>
      <input
        id={id}
        value={search}
        maxLength={80}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Experimente sensor"
      />
      <div className="demo-cards">
        {visible.map((product) => (
          <article key={product.id}>
            <small>{product.category}</small>
            <h5>{product.name}</h5>
            <button
              className="button secondary"
              type="button"
              onClick={() => setCart((previous) => [...previous, product.id])}
            >
              Adicionar {product.name}
            </button>
          </article>
        ))}
      </div>
      {!visible.length && (
        <p role="status">Nenhum componente encontrado. Experimente outra busca.</p>
      )}
      <p role="status">
        Carrinho de exemplo: {cart.length} {cart.length === 1 ? "item" : "itens"}.
      </p>
      <button
        className="button secondary"
        type="button"
        onClick={() => {
          setSearch("");
          setCart([]);
        }}
      >
        Reiniciar exemplo
      </button>
    </>
  );
}

function DashboardDemo() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [fail, setFail] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function load() {
    setStatus("loading");
    timer.current = setTimeout(() => setStatus(fail ? "error" : "success"), 700);
  }
  return (
    <>
      <h4>Painel de acompanhamento</h4>
      <p>Requisição simulada no navegador: não acessa uma API externa nem usa IA.</p>
      <label className="demo-check" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={fail}
          disabled={status === "loading"}
          onChange={(e) => setFail(e.target.checked)}
        />{" "}
        Simular falha
      </label>
      <button
        className="button primary"
        type="button"
        disabled={status === "loading"}
        onClick={load}
      >
        {status === "loading"
          ? "Carregando…"
          : status === "error"
            ? "Tentar novamente"
            : "Carregar dados"}
      </button>
      <div aria-live="polite" aria-busy={status === "loading"}>
        {status === "idle" && <p>Os dados ainda não foram solicitados.</p>}
        {status === "loading" && <p>Buscando os dados fictícios…</p>}
        {status === "error" && (
          <p role="alert">Falha simulada. Desmarque a opção e tente novamente.</p>
        )}
        {status === "success" && (
          <>
            <p>Dados fictícios carregados.</p>
            <div className="demo-cards">
              <article>
                <h5>12</h5>
                <p>Aulas disponíveis</p>
              </article>
              <article>
                <h5>4</h5>
                <p>Aulas concluídas</p>
              </article>
              <article>
                <h5>33%</h5>
                <p>Progresso da amostra</p>
              </article>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ResponsiveDemo() {
  const [compact, setCompact] = useState(false);
  return (
    <>
      <h4>Um portal, duas larguras</h4>
      <p>O mesmo conteúdo se reorganiza conforme o espaço disponível.</p>
      <div className="demo-actions">
        <button
          type="button"
          className="button secondary"
          aria-pressed={compact}
          onClick={() => setCompact(true)}
        >
          Largura estreita
        </button>
        <button
          type="button"
          className="button secondary"
          aria-pressed={!compact}
          onClick={() => setCompact(false)}
        >
          Largura disponível
        </button>
      </div>
      <div className="demo-viewport" style={{ width: compact ? "min(100%, 280px)" : "100%" }}>
        <strong>Portal de cursos</strong>
        <p>Escolha sua próxima prática.</p>
        <div className="demo-cards">
          {["HTML semântico", "CSS responsivo", "JavaScript e eventos"].map((name) => (
            <article key={name}>
              <h5>{name}</h5>
              <p>Uma explicação, um exemplo e uma tentativa.</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

function ObjectsDemo() {
  const id = useId();
  const [balances, setBalances] = useState({ A: 1000, B: 1000 });
  const [account, setAccount] = useState<"A" | "B">("A");
  const [amount, setAmount] = useState("10");
  const [message, setMessage] = useState("");
  const money = (cents: number) =>
    (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  function change(withdraw: boolean) {
    const cents = Math.round(Number(amount) * 100);
    if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 1000000) {
      setMessage("Use um valor positivo de até R$ 10.000.");
      return;
    }
    if (withdraw && cents > balances[account]) {
      setMessage("Saque recusado: saldo insuficiente. O saldo foi preservado.");
      return;
    }
    setBalances((previous) => ({
      ...previous,
      [account]: previous[account] + (withdraw ? -cents : cents),
    }));
    setMessage("Operação simulada concluída.");
  }
  return (
    <>
      <h4>Dois objetos, estados independentes</h4>
      <p>Modelo didático em JavaScript: não executa Java nem movimenta dinheiro real.</p>
      <div className="demo-cards">
        <article>
          <h5>Conta A</h5>
          <p>{money(balances.A)}</p>
        </article>
        <article>
          <h5>Conta B</h5>
          <p>{money(balances.B)}</p>
        </article>
      </div>
      <label htmlFor={`${id}-account`}>Objeto a alterar</label>
      <select
        id={`${id}-account`}
        value={account}
        onChange={(e) => {
          setAccount(e.target.value as "A" | "B");
          setMessage("");
        }}
      >
        <option value="A">Conta A</option>
        <option value="B">Conta B</option>
      </select>
      <label htmlFor={`${id}-amount`}>Valor em reais</label>
      <input
        id={`${id}-amount`}
        type="number"
        min="0.01"
        max="10000"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="demo-actions">
        <button type="button" className="button secondary" onClick={() => change(false)}>
          Depositar no objeto
        </button>
        <button type="button" className="button secondary" onClick={() => change(true)}>
          Sacar do objeto
        </button>
        <button
          type="button"
          className="button secondary"
          onClick={() => {
            setBalances({ A: 1000, B: 1000 });
            setMessage("");
          }}
        >
          Reiniciar exemplo
        </button>
      </div>
      <p role="status">{message}</p>
    </>
  );
}

const students = [
  { id: 1, name: "Ana" },
  { id: 2, name: "Bruno" },
  { id: 3, name: "Carla" },
];
const enrollments = [
  { student: 1, course: "Java" },
  { student: 1, course: "Web" },
  { student: 2, course: "IoT" },
];
function SqlDemo() {
  const id = useId();
  const [mode, setMode] = useState("left");
  const rows = students.flatMap((student) => {
    const matches = enrollments.filter((e) => e.student === student.id);
    if (mode === "count") return [{ name: student.name, value: String(matches.length) }];
    if (!matches.length) return mode === "inner" ? [] : [{ name: student.name, value: "NULL" }];
    return matches.map((e) => ({ name: student.name, value: e.course }));
  });
  return (
    <>
      <h4>Explorador de consultas</h4>
      <p>
        Amostra fixa: Ana tem Java e Web; Bruno tem IoT; Carla não tem matrícula. Consultas
        predefinidas são calculadas no navegador, sem acesso ao PostgreSQL.
      </p>
      <label htmlFor={id}>Consulta de exemplo</label>
      <select id={id} value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="left">LEFT JOIN — todos os alunos</option>
        <option value="inner">INNER JOIN — somente correspondências</option>
        <option value="count">GROUP BY — matrículas por aluno</option>
      </select>
      <pre>
        <code>
          {mode === "count"
            ? "SELECT a.nome, COUNT(m.id) AS total\nFROM alunos a LEFT JOIN matriculas m ON m.aluno_id = a.id\nGROUP BY a.id, a.nome;"
            : `SELECT a.nome, m.curso\nFROM alunos a ${mode === "inner" ? "INNER" : "LEFT"} JOIN matriculas m\n  ON m.aluno_id = a.id;`}
        </code>
      </pre>
      <div className="demo-table">
        <table>
          <caption>Resultado didático — {rows.length} linhas</caption>
          <thead>
            <tr>
              <th scope="col">Aluno</th>
              <th scope="col">{mode === "count" ? "Total" : "Curso"}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.name}-${index}`}>
                <td>{row.name}</td>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function IotDemo() {
  const id = useId();
  const [temperature, setTemperature] = useState(24);
  const [online, setOnline] = useState(true);
  const [last, setLast] = useState(24);
  const fan = online && temperature >= 28;
  return (
    <>
      <h4>Sala conectada: sensor → regra → atuador</h4>
      <p>
        Simulação no navegador. Não conecta ao Packet Tracer, MQTT ou dispositivos físicos. Nesta
        atividade, a perda de comunicação desliga o ventilador por escolha didática.
      </p>
      <label htmlFor={`${id}-temp`}>Temperatura do ambiente simulado: {temperature} °C</label>
      <input
        id={`${id}-temp`}
        type="range"
        min="10"
        max="40"
        value={temperature}
        onChange={(e) => {
          const value = Number(e.target.value);
          setTemperature(value);
          if (online) setLast(value);
        }}
      />
      <label className="demo-check" htmlFor={`${id}-online`}>
        <input
          id={`${id}-online`}
          type="checkbox"
          checked={online}
          onChange={(e) => {
            setOnline(e.target.checked);
            if (e.target.checked) setLast(temperature);
          }}
        />{" "}
        Comunicação conectada
      </label>
      <div className="demo-cards" aria-live="polite">
        <article>
          <h5>Leitura recebida</h5>
          <p>{last} °C</p>
          <small>
            {online ? "Atual nesta simulação" : "Leitura antiga — não é a temperatura atual"}
          </small>
        </article>
        <article>
          <h5>Regra local</h5>
          <p>Ligar a partir de 28 °C com comunicação ativa.</p>
        </article>
        <article>
          <h5>Ventilador</h5>
          <p>{fan ? "Ligado" : "Desligado"}</p>
        </article>
      </div>
      {!online && (
        <p role="status">
          Sem comunicação: último valor preservado e ventilador desligado nesta simulação.
        </p>
      )}
    </>
  );
}

export default function LessonDemo({ kind }: { kind: NonNullable<Lesson["demo"]> }) {
  return (
    <section className="lesson-demo" aria-label="Laboratório interativo">
      <div className="eyebrow">EXPERIMENTE AQUI</div>
      {kind === "form" ? (
        <FormDemo />
      ) : kind === "catalog" ? (
        <CatalogDemo />
      ) : kind === "dashboard" ? (
        <DashboardDemo />
      ) : kind === "responsive" ? (
        <ResponsiveDemo />
      ) : kind === "objects" ? (
        <ObjectsDemo />
      ) : kind === "sql" ? (
        <SqlDemo />
      ) : (
        <IotDemo />
      )}
    </section>
  );
}
