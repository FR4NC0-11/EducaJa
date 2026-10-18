"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Scale, Landmark, Feather } from "lucide-react";
import { lawSubjects } from "@/lib/law-area";

export default function LawArea() {
  const [selectedId, setSelectedId] = useState(lawSubjects[0].id);
  const selected = lawSubjects.find((subject) => subject.id === selectedId)!;
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const changed = useRef(false);
  useEffect(() => {
    if (changed.current) detailTitle.current?.focus();
  }, [selectedId]);
  return (
    <section className="law-home" aria-labelledby="law-title">
      <header className="law-hero">
        <div className="law-hero-copy">
          <div className="law-overline">
            <span aria-hidden="true" /> UM NOVO ESPAÇO DE ESTUDO
          </div>
          <h1 id="law-title">
            Direito<span className="law-title-dot">.</span>
          </h1>
          <p className="law-lead">
            Leia o contexto.
            <br />
            <em>Construa o argumento.</em>
          </p>
          <p className="law-intro">
            Um lugar para organizar ideias, conhecer a linguagem jurídica e explorar os caminhos do
            Direito brasileiro.
          </p>
          <a className="law-explore" href="#law-subjects">
            Explorar as matérias <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="law-emblem" aria-hidden="true">
          <span className="law-emblem-caption">EDUCAJÁ · DIREITO</span>
          <div className="law-emblem-frame">
            <Scale size={100} strokeWidth={1} />
          </div>
          <div className="law-emblem-base">
            <span />
            ESTUDO & REFLEXÃO
            <span />
          </div>
        </div>
      </header>

      <div className="law-edition-line">
        <span>DIREITO BRASILEIRO</span>
        <span>08 RECORTES DE ESTUDO</span>
        <span>ACERVO EM ORGANIZAÇÃO</span>
      </div>

      <section className="law-reading-note" aria-labelledby="law-reading-title">
        <Feather size={25} aria-hidden="true" />
        <div>
          <h2 id="law-reading-title">Antes de decorar, compreender.</h2>
          <p>
            O percurso está sendo organizado para combinar conceitos, leitura e reflexão. Conheça
            abaixo os temas previstos para cada matéria.
          </p>
        </div>
        <span className="law-outline-number" aria-hidden="true">
          §
        </span>
      </section>

      <section
        id="law-subjects"
        aria-labelledby="law-subjects-title"
        className="law-subject-section"
      >
        <div className="law-section-heading">
          <div>
            <span className="law-overline">ÍNDICE DE MATÉRIAS</span>
            <h2 id="law-subjects-title" tabIndex={-1}>
              Caminhos do estudo jurídico
            </h2>
          </div>
          <span className="law-preparing">
            <span aria-hidden="true" /> Aulas em preparação
          </span>
        </div>
        <div className="law-subject-layout">
          <ol className="law-subject-list" aria-label="Matérias de Direito">
            {lawSubjects.map((subject) => (
              <li key={subject.id}>
                <button
                  className={`law-subject ${subject.id === selectedId ? "selected" : ""}`}
                  aria-pressed={subject.id === selectedId}
                  aria-controls="law-subject-preview"
                  onClick={() => {
                    changed.current = true;
                    setSelectedId(subject.id);
                    if (subject.id === selectedId) detailTitle.current?.focus();
                  }}
                  aria-label={`Explorar ${subject.title}`}
                >
                  <span className="law-roman" aria-hidden="true">
                    {subject.number}
                  </span>
                  <span className="law-subject-copy">
                    <span>{subject.label}</span>
                    <strong>{subject.title}</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
          <section
            id="law-subject-preview"
            className="law-preview"
            aria-labelledby="law-preview-title"
          >
            <Landmark size={29} strokeWidth={1.2} aria-hidden="true" />
            <span className="law-overline">RECORTE {selected.number} · PRÉVIA</span>
            <h3 id="law-preview-title" ref={detailTitle} tabIndex={-1}>
              {selected.title}
            </h3>
            <p>{selected.description}</p>
            <p>{selected.focus}</p>
            <h4>Temas previstos</h4>
            <ul>
              {selected.themes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
            <div className="law-preview-status">
              <BookOpen size={18} aria-hidden="true" />
              <p>
                Aulas e exercícios ainda em preparação. Esta prévia apresenta a organização dos
                temas.
              </p>
            </div>
            <a className="law-index-return" href="#law-subjects-title">
              Voltar ao índice de matérias
            </a>
          </section>
        </div>
      </section>
      <footer className="law-footer">
        <Scale size={20} aria-hidden="true" />
        <p>
          Um novo acervo, com a mesma proposta do EducaJá: estudar com clareza, uma ideia de cada
          vez.
        </p>
      </footer>
    </section>
  );
}
