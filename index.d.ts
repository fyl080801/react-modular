import { AnyAction, Reducer, Store } from "redux";

export type AppModuleMap = { [key: string]: IAppModule };

export type ReducerMap<TState> = { [key: string]: Reducer<TState> };

export type MapToProps<TStateProps, TOwnProps, State> = (state: State, ownProps: TOwnProps) => TStateProps;

export type MapToPropsFactory<TStateProps, TOwnProps, State> = (
  initialState: State,
  ownProps: TOwnProps
) => MapToProps<TStateProps, TOwnProps, State>;

export type MapToPropsParam<TStateProps, TOwnProps, State> =
  | MapToPropsFactory<TStateProps, TOwnProps, State>
  | MapToProps<TStateProps, TOwnProps, State>
  | State;

export interface IAppModule {
  /**
   * 初始化模块
   * @param store 全局 store
   */
  initialize(store: Store): void;

  /**
   * 链接组件
   * @param componentType 组件类型
   * @returns 组件创建者
   */
  connect(componentType: any): IAppComponentFactory;

  /**
   * 获取当前模块下的 state
   */
  getState(): any;
}

export interface IAppModuleFactory {
  (): IAppModule;

  createState<TData>(stateName: string, initData: TData): IAppModuleFactory;
}

export interface IAppModuleFactoryCreator {
  (name: string): IAppModuleFactory;

  modules: AppModuleMap;
}

export interface ModularProviderProps {
  store: any;
}

export interface IAppComponentFactory {
  (options?: any): any;

  // mapState(): IAppComponentFactory;

  // mapDispatch(): IAppComponentFactory;

  mapProps<TStateProps = {}, TOwnProps = {}, State = {}>(
    mapToProps: MapToPropsParam<TStateProps, TOwnProps, State>
  ): IAppComponentFactory;
}
