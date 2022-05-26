import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("DidCatch", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1 style={{ textAlign: "center" }}>Eita erro!</h1>;
          <a href="setnfy.netlify.app">Voltar pra página inicial</a>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
