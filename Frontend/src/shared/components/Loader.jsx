import './styles/loader.scss';

export default function Loader({ fullScreen = false, text = "Loading..." }) {
  return (
    <div className={`loader ${fullScreen ? "loader--fullscreen" : ""}`}>
      <div className="loader__spinner" />
      {text && <p className="loader__text">{text}</p>}
    </div>
  );
}