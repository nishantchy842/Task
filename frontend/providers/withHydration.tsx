import { cache } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: 2400,
        },
      },
    })
);

export const withHydration = <T extends object>(
  Component: React.FC<T>,
  query: (queryClient: QueryClient, props: T) => Promise<QueryClient>
): React.FC<T> => {
  return async function (props) {
    const queryClient = await query(getQueryClient(), props);

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrationBoundary state={dehydratedState}>
        <Component {...props} />
      </HydrationBoundary>
    );
  };
};
