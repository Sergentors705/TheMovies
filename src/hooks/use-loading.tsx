import { useState } from "react";

export default function useLoading(request: any) {

  const [loading, setLoading] = useState(true);
  const requestWithState = async () => {
    await request();
    setLoading(false);
  }
  return [requestWithState, loading] as const;

}
