import { useState } from "react";

export default function useLoading(request) {

  const [loading, setLoading] = useState(true);
  const requestWithState = async () => {await request();
    setLoading(false);}
  return [requestWithState, loading];

}
