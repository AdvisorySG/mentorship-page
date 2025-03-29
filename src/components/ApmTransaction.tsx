// Adapted from https://github.com/elastic/apm-agent-rum-js/issues/1185#issuecomment-1481208219

import React, { ReactNode, useEffect, useMemo } from "react";

import { ApmBase, init as initApm } from "@elastic/apm-rum";
import { afterFrame } from "@elastic/apm-rum-core";
import { useRouter } from "next/navigation";

const apm = initApm({
  serviceName: "mentorship-page",
  serverUrl:
    "https://8dd263e7f7024f9086fd4aa060ae4d79.apm.ap-southeast-1.aws.cloud.es.io:443",
  serviceVersion: "",
  environment: process.env.NODE_ENV,
});

const ApmTransaction = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const transaction = useMemo(() => {
    if (!apm) return;
    return apm.startTransaction(router.asPath, "route-change", {
      managed: true,
      canReuse: true,
    });
  }, [apm, router.asPath]);

  useEffect(() => {
    if (!transaction) return;
    afterFrame(() => transaction && (transaction as any)?.detectFinish());
    return () => {
      /**
       * Incase the transaction is never ended, we check if the transaction
       * can be closed during unmount phase
       *
       * We call detectFinish instead of forcefully ending the transaction
       * since it could be a redirect route and we might prematurely close
       * the currently running transaction
       */
      transaction && (transaction as any)?.detectFinish();
    };
  }, [transaction]);

  return <>{children}</>;
};

export default ApmTransaction;
