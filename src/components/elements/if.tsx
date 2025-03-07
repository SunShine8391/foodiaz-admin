import { useMemo } from "react";

type Falsy = false | 0 | "" | null | undefined;

type Condition<Value = unknown> = Value | Falsy;

function If<Value = unknown>({
  condition,
  children,
  fallback,
}: React.PropsWithoutRef<{
  condition: Condition<Value>;
  children: React.ReactNode | ((value: Value) => React.ReactNode);
  fallback?: JSX.Element;
}>) {
  return useMemo(() => {
    if (condition) {
      if (typeof children === "function") {
        return <>{children(condition)}</>;
      }

      return <>{children}</>;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return null;
  }, [condition, fallback, children]);
}

export default If;
