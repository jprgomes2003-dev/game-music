--
-- PostgreSQL database dump
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha_hash character varying(255), -- agora pode ser NULL
    google_id character varying(255),  -- novo campo
    data_nascimento DATE,
    data_criacao timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.usuarios OWNER TO postgres;

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;

ALTER TABLE ONLY public.usuarios 
ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);

--
-- Como consultar idade:
-- SELECT nome, EXTRACT(YEAR FROM AGE(CURRENT_DATE, data_nascimento)) AS idade FROM public.usuarios;
--

COPY public.usuarios (id, nome, email, senha_hash, google_id, data_nascimento, data_criacao) FROM stdin;
1	Jair Bolsonaro	bolsonaro22@gmail.com	$2y$10$3lDBw6frU59DRjqApUD0eOP83fi.wJoOh.S2shbldLq2pZueYyWWm	\N	1955-03-21	2026-03-20 17:14:39.702078
2	lula	lula@gmail.com	$2y$10$Bt2cm1/NLtb/lAV.XjvFAOg84gM8ycSuvrvaczTq/GOUkwG757/cm	\N	1945-10-27	2026-03-20 19:08:04.294832
\.

SELECT pg_catalog.setval('public.usuarios_id_seq', 2, true);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_google_id_key UNIQUE (google_id);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
