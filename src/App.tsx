import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useAppPage } from "./hooks/useAppPage";
import { AppRoutes } from "./routes/AppRoutes";


function PainelPrincipal() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    categoriasDisponiveis,
    categoriaSelecionada,
    itensFiltrados,
    loading,
    errorMessage,
    selecionarCategoria,
  } = useAppPage("IOP");

  const handleCardClick = (item: any) => {
    const tipo = (item?.type || categoriaSelecionada || "").toUpperCase();

    if (tipo === "IOP") {
      navigate("/details", { state: { iop: item, categoria: "IOP" } });
    } else if (tipo === "TRAINING") {
      navigate("/details", { state: { training: item, categoria: "TRAINING" } });
    } else if (tipo === "EXPLANATION") {
      navigate("/details", {
        state: { explanation: item, categoria: "EXPLANATION" },
      });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        style={{
          backgroundColor: "#ffffff",
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#111827",
              fontWeight: "bold",
            }}
          >
            IA-MES - Biblioteca de Normas (IOPs)
          </h1>
          <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#4b5563" }}>
            Bem-vindo, <strong>{user?.username || "Operador"}</strong>! •
            Status:{" "}
            <span
              style={{
                color: isAuthenticated ? "#0d9488" : "#ef4444",
                fontWeight: "bold",
              }}
            >
              {isAuthenticated ? "Conectado com sucesso" : "Não autenticado"}
            </span>
          </p>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "8px 16px",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Sair (Logout)
        </button>
      </header>

      <div
        style={{
          padding: "12px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "4px",
          }}
        >
          {categoriasDisponiveis.map((categoria: string) => {
            const isSelected = categoriaSelecionada === categoria;
            return (
              <button
                key={categoria}
                onClick={() => selecionarCategoria(categoria)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  border: isSelected
                    ? "1px solid #0f766e"
                    : "1px solid #d1d5db",
                  backgroundColor: isSelected ? "#0f766e" : "#ffffff",
                  color: isSelected ? "#ffffff" : "#1f2937",
                  fontWeight: "bold",
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {categoria.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      <main style={{ flex: 1, padding: "16px 24px" }}>
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#0d9488",
              fontWeight: "bold",
            }}
          >
            Carregando...
          </div>
        ) : errorMessage ? (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#ef4444" }}
          >
            {errorMessage}
          </div>
        ) : itensFiltrados.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}
          >
            Nenhum item encontrado para esta categoria.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            {itensFiltrados.map((itemAtual: any, index: number) => {
              const idStr = itemAtual.id?.toString() ?? "";
              const titulo = itemAtual.titulo ?? "";
              const chamado = itemAtual.chamadoReferencia ?? "";

              return (
                <div
                  key={idStr || index}
                  onClick={() => handleCardClick(itemAtual)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    aspectRatio: "1.5",
                    border: "1px solid #f3f4f6",
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#f0fdfa",
                        color: "#0f766e",
                        fontWeight: "bold",
                        fontSize: "12px",
                        padding: "4px 8px",
                        borderRadius: "8px",
                      }}
                    >
                      {idStr}
                    </span>

                    <h3
                      style={{
                        margin: "12px 0 8px 0",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#1f2937",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {titulo}
                    </h3>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: "12px",
                      color: "#6b7280",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chamado}
                  </p>
                </div>
              );
            })}
          </div>
        )}
     </main>

      
      <button
        onClick={() => navigate("/chat")}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#0d9488",
          color: "#ffffff",
          border: "none",
          borderRadius: "9999px",
          padding: "14px 24px",
          fontWeight: "bold",
          fontSize: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          zIndex: 50,
        }}
      >
        <span>✨ Assistente IA</span>
      </button>
    </div>
  );
}

function App() {
  return <AppRoutes homeElement={<PainelPrincipal />} />;
}

export default App;