export default class PageController {
    bookText!: string;
    // bookLines: string[] = [];
    /**
     * 每行最多几个字符
     */
    lineWordCount = 15;


    /**
     * 每页最多几行
     */
    pageLineCount = 7;
    currentContent: string[] = [];
    pages: string[][] = [];
    private currentPage = 0;

    constructor(bookText?: string, pageLineCount: number = 7) {
        this.pageLineCount = pageLineCount;
        this.updateBookText(bookText);
    }


    /**
     * 更新小说文本，将文本进行分页
     * 每页最多pageLineCount行
     * 每行最多lineWordCount个字符
     * @param bookText
     */
    updateBookText(bookText?: string | null): string[] {
        this.bookText = bookText ?? "";
        const lines = this.bookText.split(/\r?\n/);
        const regExp = new RegExp(`(.{1,${this.lineWordCount}})`, "g");
        this.pages = [];
        let bookLines: string[] = [];
        for (let line of lines) {
            const trim = line.trim();
            if (trim.length >= this.lineWordCount) {
                const chunk = trim.match(regExp);
                if (chunk) {
                    for (let chunkElement of chunk) {
                        bookLines.push(chunkElement);
                    }
                }
            } else {
                bookLines.push(trim);
            }
            if (bookLines.length >= this.pageLineCount) {
                this.pages.push(bookLines);
                bookLines = []
            }
        }
        // this.bookText = this.bookLines.join("");
        return this.updatePageContent(this.currentPage);
    }

    setPageLineCount(pageLineCount: number) {
        if (pageLineCount < 1) {
            pageLineCount = 1;
        }
        this.pageLineCount = pageLineCount;
        this.updateBookText(this.bookText);
    }

    previousPage(): string[] {
        return this.setCurrentPage(this.currentPage - 1);
    }

    nextPage(): string[] {
        return this.setCurrentPage(this.currentPage + 1);
    }

    /**
     * 更新页内容
     * 第一行，为上一页最后一行内容，增加衔接感，提升体验
     * @param pageNumber
     * @private
     */
    private updatePageContent(pageNumber: number): string[] {
        if (this.pages.length == 0) {
            return ["没有找到歌词"];
        }
        if (pageNumber >= this.pages.length) {
            return this.pages[this.pages.length - 1];
        } else if (pageNumber < 0) {
            return this.pages[0];
        }
        this.currentContent = [];
        if (pageNumber > 0) {
            const previousPage = this.pages[pageNumber - 1];
            this.currentContent.push(previousPage[previousPage.length - 1]);
        }
        this.pages[pageNumber].forEach((it) => this.currentContent.push(it));
        return this.currentContent;
    }

    setCurrentPage(pageNumber: number): string[] {
        if (pageNumber < 0) {
            this.currentPage = 0;
        }
        this.currentPage = pageNumber;
        return this.updatePageContent(this.currentPage);
    }

    /**
     * 获取总页数
     */
    getTotalPage(): number {
        return this.pages.length;
    }

    getCurrentPage(): number {
        return this.currentPage;
    }


    /**
     * @param keyword
     * @return [pageNumber,lineNumber,indexOf]
     */
    search(keyword: string): number[] | undefined {
        for (let pageNumber = 0; pageNumber < this.pages.length; pageNumber++) {
            const page = this.pages[pageNumber];
            for (let lineNumber = 0; lineNumber < page.length; lineNumber++) {
                const index = page[lineNumber].indexOf(keyword);
                if (index > -1) {
                    return [pageNumber, lineNumber, index];
                }
            }
            for (let line of page) {

            }
        }
        return undefined;
    }

}
