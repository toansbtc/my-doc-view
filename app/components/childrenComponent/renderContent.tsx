export const renderContent = (content: any) => {
    return content.split("\n").map((line: any, index: any) => {
        const lowerLine = line.toLowerCase();

        if (lowerLine.startsWith("command:")) {
            return (
                <div key={index} className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-bold text-blue-700 dark:text-blue-400">
                        Command:
                    </span>

                    <code className="rounded-md bg-slate-900 px-2 py-1 font-mono text-sm text-emerald-300 dark:bg-slate-800 dark:text-emerald-300">
                        {line.replace(/^command:\s*/i, "")}
                    </code>
                </div>
            );
        }

        if (lowerLine.startsWith("warning:")) {
            return (
                <div
                    key={index}
                    className="mb-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
                >
                    <span className="font-bold">Warning:</span>{" "}
                    {line.replace(/^warning:\s*/i, "")}
                </div>
            );
        }

        if (lowerLine.startsWith("note:")) {
            return (
                <div
                    key={index}
                    className="mb-2 rounded-md border border-sky-300 bg-sky-50 px-3 py-2 text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300"
                >
                    <span className="font-bold">Note:</span>{" "}
                    {line.replace(/^note:\s*/i, "")}
                </div>
            );
        }

        return (
            <div
                key={index}
                className="mb-1 text-slate-700 dark:text-slate-300"
            >
                {line}
            </div>
        );
    });
};