import "./transition.scss";

import {CSSTransition} from "react-transition-group";
import React from "react";
import {View} from "@tarojs/components";
import classNames from "classnames";

interface PropsInterface {
  tmAppear?: boolean; // 初次加载时执行动画
  tmDelay?: number; // 延迟显示时间（毫秒）
  tmDestroyAfterHide?: boolean; // 退出后清除dom
  tmMotion?:
    | "bounce"
    | "zoom"
    | "punch"
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right";
  tmShow?: boolean; // 是否显示
  onHide?: () => void; // 完成隐藏回调
  onShow?: () => void; // 完成显示回调
  onClick?: (event?: any) => void | null; // 点击事件回调
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: object; // 自定义行内样式
}

function TmTransition(props: PropsInterface) {
  const {
    tmAppear = false,
    tmDelay = 0,
    tmDestroyAfterHide = false,
    tmMotion = "fade",
    tmShow = false,
    onHide = () => {
    },
    onShow = () => {
    },
    onClick = () => {
    },
    className = "",
    style = {},
  } = props;

  return (
    <CSSTransition
      in={tmShow}
      timeout={tmDelay}
      appear={tmAppear}
      unmountOnExit={tmDestroyAfterHide}
      classNames={`tm-transition-${tmMotion}`}
      className={classNames(
        "tm-transition",
        `tm-transition-${tmMotion}`,
        className
      )}
      onEntered={onShow}
      onExited={onHide}
      style={style}
    >
      <View onClick={onClick}>{props.children}</View>
    </CSSTransition>
  );
}

export default TmTransition;
