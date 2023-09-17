interface GetBalanceProps {
    tokenOption: `0x${string}` | null;
}
export declare const useGetBalance: ({ tokenOption }: GetBalanceProps) => Pick<import("@tanstack/query-core").QueryObserverResult<import("@wagmi/core").FetchBalanceResult, Error>, "data" | "error" | "fetchStatus" | "isError" | "isFetched" | "isFetchedAfterMount" | "isFetching" | "isLoading" | "isRefetching" | "isSuccess" | "refetch"> & {
    isIdle: boolean;
    status: "error" | "idle" | "loading" | "success";
    internal: Pick<import("@tanstack/query-core").QueryObserverResult, "dataUpdatedAt" | "errorUpdatedAt" | "failureCount" | "isLoadingError" | "isPaused" | "isPlaceholderData" | "isPreviousData" | "isRefetchError" | "isStale" | "remove">;
};
export {};
