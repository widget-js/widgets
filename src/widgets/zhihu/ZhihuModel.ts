export class ZhihuModel {

    title: string;
    url: string;
    hot: string;

    constructor(title: string, url: string, hot: string) {
        this.title = title;
        this.url = url;
        this.hot = hot?.replace("热度","");
    }
}


export class ZhihuConvert {

    static news2Model(list: ZhihuNews[]) : ZhihuModel[] {
       return list.map( news => {
          return new ZhihuModel(news.title, news.url, "")
       });
    }

    static hot2Model(list: ZhihuHot[]) : ZhihuModel[] {
        return list.map( news => {
            return new ZhihuModel(news.target.title, news.target.url, news.detail_text);
         });
    }
}

interface ZhihuHot {
    attached_info: string;
    card_id: string;
    children: [];
    debut: boolean;
    detail_text: string;
    id: string;
    style_type: string;
    target: ZhihuHotTarget;
    trend: number;
    // hot_list_feed
    type: string;
}

interface ZhihuHotTarget {
    answer_count: number;
    author: any;
    bound_topic_ids: [];
    comment_count: number;
    created: number;
    excerpt: string;
    follower_count: number;
    id: number;
    is_following: boolean;
    title: string;
    type: string;
    url: string;
}

interface ZhihuNews {
    ga_prefix:string;
    hint: string;
    id: string;
    image_hue: string;
    images: [];
    title: string;
    type: number;
    url: string;
}
