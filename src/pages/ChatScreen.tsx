import React from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useChatPage } from "../hooks/userChatPage";


export const ChatScreen: React.FC = () => {
    const navigate = useNavigate();
    const {
        categoriasDisponiveis,
        categoriaSelecionada,
        mensagens,
        textoInput,
        setTextoInput,
        carregando,
        fimDasMensagensRef,
        alterarCategoria,
        novoChat,
        enviarMensagem,
        pararMensagem,
    } = useChatPage();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !carregando) {
            enviarMensagem();
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                backgroundColor: "#ffffff",
                fontFamily: "Arial, sans-serif",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* --- CABEÇALHO --- */}
            <header
                style={{
                    padding: "20px 24px 8px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            background: "transparent",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                            color: "#1f2937",
                            padding: "4px 8px",
                        }}
                        title="Voltar"
                    >
                        ←
                    </button>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "26px",
                            fontWeight: "bold",
                            color: "#1f2937",
                        }}
                    >
                        Suporte MES
                    </h1>
                </div>

                <button
                    onClick={novoChat}
                    style={{
                        padding: "8px 16px",
                        backgroundColor: "#fdf2f8",
                        color: "#ec4899",
                        border: "none",
                        borderRadius: "20px",
                        fontWeight: 600,
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                    }}
                >
                    <span>+</span>
                    <span>Novo</span>
                </button>
            </header>

            {/* --- SELETOR DE CATEGORIA --- */}
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    overflowX: "auto",
                    padding: "8px 24px",
                }}
            >
                {categoriasDisponiveis.map((cat) => {
                    const isSelected = categoriaSelecionada === cat;
                    return (
                        <button
                            key={cat}
                            onClick={() => alterarCategoria(cat)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "20px",
                                border: isSelected
                                    ? "1px solid #0d9488"
                                    : "1px solid transparent",
                                backgroundColor: isSelected ? "#ccfbf1" : "#f3f4f6",
                                color: isSelected ? "#134e4a" : "#6b7280",
                                fontWeight: isSelected ? "bold" : "normal",
                                fontSize: "14px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>

            {/* --- LISTA DE MENSAGENS --- */}
            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "8px 16px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {mensagens.map((msg, index) => {
                    const isUser = msg.remetente === "user";
                    return (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                justifyContent: isUser ? "flex-end" : "flex-start",
                                marginBottom: "12px",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "75%",
                                    padding: "12px 16px",
                                    backgroundColor: isUser ? "#0d9488" : "#f3f4f6",
                                    color: isUser ? "#ffffff" : "#1f2937",
                                    borderRadius: isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                                    fontSize: "15px",
                                    lineHeight: 1.4,
                                    wordBreak: "break-word",
                                    whiteSpace: "pre-wrap",
                                }}
                            >
                                <ReactMarkdown>{msg.texto}</ReactMarkdown>
                            </div>
                        </div>
                    );
                })}
                <div ref={fimDasMensagensRef} />
            </div>

            {/* --- INDICADOR DE CARREGAMENTO --- */}
            {carregando && (
                <div
                    style={{
                        padding: "4px 24px",
                        fontSize: "13px",
                        color: "#0d9488",
                        fontWeight: "bold",
                    }}
                >
                    Assistente digitando...
                </div>
            )}

            {/* --- BARRA DE DIGITAÇÃO --- */}
            <div
                style={{
                    padding: "12px 16px 16px 16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.05)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <input
                    type="text"
                    value={textoInput}
                    onChange={(e) => setTextoInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Descreva a sua dúvida ou problema..."
                    style={{
                        flex: 1,
                        backgroundColor: "#f3f4f6",
                        border: "none",
                        borderRadius: "24px",
                        padding: "14px 20px",
                        fontSize: "15px",
                        color: "#1f2937",
                        outline: "none",
                    }}
                />

                <button
                    onClick={carregando ? pararMensagem : enviarMensagem}
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: carregando ? "#fef2f2" : "#0d9488",
                        color: carregando ? "#ef4444" : "#ffffff",
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                    title={carregando ? "Parar" : "Enviar"}
                >
                    {carregando ? "■" : "➤"}
                </button>
            </div>
        </div>
    );
};