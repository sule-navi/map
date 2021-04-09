/*
 * @Author: Sule
 * @Date: 2019-12-13 09:46:59
 * @LastEditors: Sule
 * @LastEditTime: 2020-10-14 14:45:07
 * @Description: 用于地图内部
 */
// initial state
import auth from "@/utils/auth";
const state = {
  selectTool: {
    name: 'PAN'
  },
  editorLoading: false, // 用于创建修改菊花控制
  mapCookieKey: auth.getSessionStorage('mapCookieKey') || { zoom: 19 }, //地图位置信息
  mapToolbarFlag: false, // 快捷工具显示
  leftFlowPanelFlag: false, // 左侧数据列表
  leftViewPanelFlag: false, // 左侧照片等面板
  currentLeftFlowAttributePanel: '', // 左侧数据面板
  currentViewFlowAttributePanel: '', // 左侧照片等面板
  currentLeftAttributePanelData: null, // 左侧面板数据
  currentViewAttributePanelData: null, // 左侧面板数据
  rightPanelFlag: false, //右侧面板显示
  rightFlowPanelFlag: false, //右侧创建修改浮动面板显示
  currentRightPanel: '', //当前展示的右侧面板
  currentAttributePanel: '', // 当前展示的属性面板
  currentFlowAttributePanel: '', // 当前展示的属性面板
  currentAttributePanelData: null, // 当前展示的属性面板从工具里边传入的值
  currentTopoEditor: null, // 当前使用的topoEditor
  selectToolList: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],// 快捷工具预留
  rightToolFlag: 1, // 标记右侧工具面板是单行还是双行，1是单行，2是双行,
  OperationType: null, // 操作类型
  GeoLiveType: null, // 类型
  CurrentObject: null, // 当前对象
  dataListFlag: false, // 选择数据控制
  editToolsFlag: false, // 编辑功能
  miniDialogFlag: false, // 弹出框缩小数据容器
  CurrentFloor: auth.getSessionStorage('CurrentPark') && auth.getSessionStorage('CurrentPark').parkingFloor, // 当前楼层
  CurrentReferenceFloor: null, // 当前参考楼层
  channelPointFloor: null, // 当前通道打开时的楼层
  CurrentReferencePark: null, // 当前选择的参考停车场
  lifecycleArray: { // tips图层的筛选选项
    init: {
      label: '待作业',
      value: 0,
      checked: true
    },
    add: {
      label: '已作业',
      value: 2,
      checked: true
    },
    edit: {
      label: '有问题',
      value: 1,
      checked: true
    }
  },
  dataListData: [], // 选择数据
  dialogBoxData: [], // 弹出面板的数据
  allRecentToolsFlag: false, // 是否展开双行快捷工具条
  currentData: auth.getSessionStorage('CurrentData') || null, // 当前选择的GDB数据库 null为默认值根据作业和成果库区分
  currentHistoryDatas: auth.getSessionStorage('CurrentHistoryDatas') || [], // 当前停车场GDB历史版本库
  activeTab: 'roadFeature', // 右侧面板当前打开的 tab 标签，默认打开道路要素标签
}

// getters
const getters = {}

// actions
const actions = {
}

// mutations
const mutations = {
  /**
   * @description:
   * @param {type}
   * @return {type}
   * @author: Qiangshaofeng
   */
  setActiveTab(state, data) {
    state.activeTab = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setMapCookieKey(state, obj) {
    state.mapCookieKey = obj;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setMapZoom(state, obj) {
    state.mapCookieKey.zoom = obj;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  changePanelStatus(state, data) {
    for (const key of Object.keys(data)) {
      state[key] = data[key];
    }
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setSelectTool(state, data) {
    state.selectTool = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setSelectToolList(state, data) {
    state.selectToolList = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setOperationType(state, data) {
    state.OperationType = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setGeoLiveType(state, data) {
    state.GeoLiveType = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentObject(state, data) {
    state.CurrentObject = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setDataListData(state, data) {
    state.dataListData = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setTopoEditor(state, data) {
    state.currentTopoEditor = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentTools(state, data) {
    state.currentTools = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentFloor(state, data) {
    state.CurrentFloor = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentReferenceFloor(state, data) {
    state.CurrentReferenceFloor = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setChannelPointFloor(state, data) {
    state.channelPointFloor = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setCurrentReferencePark(state, data) {
    state.CurrentReferencePark = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  setLifecycleArrayChecked(state, data) {
    state.lifecycleArray[data.key].checked = data.checked;
  },
  /**
   * @description:
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  resetState(state) {
    state.dataListFlag = false;
    state.rightPanelFlag = false;
    state.rightFlowPanelFlag = false;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  resetEditorLoading(stat, data) {
    state.editorLoading = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  resetCurrentData(state, data) {
    state.currentData = data;
  },
  /**
   * @description:
   * @param {type}
   * @param {type}
   * @return {type}
   * @author: Sule
   */
  resetCurrentHistoryDatas(state, data) {
    state.currentHistoryDatas = data;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
