import { redirect } from "next/navigation";

/** La presentación vive en /slide/[n]; la raíz siempre abre la portada. */
export default function Home() {
  redirect("/slide/1");
}
