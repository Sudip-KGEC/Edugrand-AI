import AppProviders from "./app/app.providers";
import AppRoutes from "./app/app.routes";

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}