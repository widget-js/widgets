import {computed, ComputedRef, ref, Ref} from 'vue'
import {ElectronUtils, WidgetData, WidgetDataApi, WidgetParams} from "@widget-js/core";

export interface UseWidgetOption<T extends WidgetData> {
  onDataLoaded?: (data?: T) => void,
  /**
   * 在使用浏览器调试时使用，必传参数有：id,name,widthPx,heightPx
   */
  debugParams?: WidgetParams,
  defaultData?: T,
  /**
   * 预览模式下显示的数据
   */
  previewData?: T,
  /**
   * 是否忽略组件id，只通过组件名获取数据
   */
  loadDataByWidgetName?: boolean;
  /**
   * 组件id，如果不传默认使用WidgetParams里的id
   */
  widgetId?: string;
  /**
   * 组件名，如果不传默认使用WidgetParams里的name
   */
  widgetName?: string;
}

export interface UseWidgetReturn<T extends WidgetData> {
  widgetParams: WidgetParams;
  widgetData: Ref<T>;
  dataLoaded: Ref<boolean>;
  sizeStyle: ComputedRef<{ width: string; height: string; }>
}

export function useWidget<T extends WidgetData>(type: {
  new(name: string, id?: string): T;
}, option?: UseWidgetOption<T>): UseWidgetReturn<T> {
  //从url地址获取组件参数
  let widgetParams: WidgetParams;

  if (ElectronUtils.getAPI() == null && option?.debugParams != null) {
    //如果没在Electron上运行，生成测试的参数
    widgetParams = option?.debugParams
    widgetParams.widthPx = (widgetParams.width ?? 2) * 100;
    widgetParams.heightPx = (widgetParams.height ?? 2) * 100;
  } else {
    widgetParams = WidgetParams.fromCurrentLocation();
  }
  //组件默认数据
  let widgetData = ref<T>(new type(widgetParams.name!)) as Ref<T>;
  if (option?.defaultData) {
    widgetData.value = option?.defaultData;
    widgetData.value.name = widgetParams.name!;
    widgetData.value.id = widgetParams.id!;
  }
  const dataLoaded = ref(false);
  const widgetName = option?.widgetName ?? widgetParams.name!;
  const widgetId = option?.widgetId ?? widgetParams.id!;

  const loadData = () => {
    if (option?.loadDataByWidgetName) {
      WidgetDataApi.findByName<T>(widgetName, type).then((data) => {
        if (data) {
          widgetData.value = data
        }
        option?.onDataLoaded?.(data);
        dataLoaded.value = true;
      });
    } else {
      widgetData.value.id = widgetParams.id!;
      WidgetDataApi.find<T>(widgetName, widgetId, type).then((data) => {
        if (data) {
          widgetData.value = data
        }
        option?.onDataLoaded?.(data);
        dataLoaded.value = true;
      });
    }
  }

  //加载已保存的组件数据
  if (widgetParams.preview && option?.previewData) {
    widgetData.value = option?.previewData;
  } else {
    loadData();
  }

  const sizeStyle = computed(() => {
    return {
      width: `${widgetParams.widthPx}px`,
      height: `${widgetParams.heightPx}px`,
    }
  });

  return {widgetParams, widgetData, dataLoaded, sizeStyle}
}


export function useWidgetScale(width: number, height: number, widgetWidth: number, widgetHeight: number): number {
  if (width >= widgetWidth && height >= widgetHeight) {
    return 1;
  } else if (widgetWidth > width && widgetHeight < height) {
    return width / widgetWidth;
  } else if (widgetWidth < width && widgetHeight > height) {
    return height / widgetHeight;
  } else {
    //按长边缩放
    if (widgetWidth > widgetHeight) {
      return width / widgetWidth;
    } else {
      return height / widgetHeight;
    }
  }
}
