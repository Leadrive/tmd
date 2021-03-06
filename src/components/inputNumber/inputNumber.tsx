import React, { useLayoutEffect, useState } from "react";
import { Input, View } from "@tarojs/components";
import classNames from "classnames";
import throttle from "lodash/throttle";
import { CommonEventFunction } from "@tarojs/components/types/common";
import { TmIcon } from "../../index";
import { createUniqueId } from "../../functions";

export interface inputNumberProps {
  tmBorder?: boolean; // 显示边框
  tmDigit?: boolean; // 带小数
  tmDisabled?: boolean; // 禁用
  tmFocus?: boolean; // 获取焦点
  tmId?: string; // 唯一id，用于表单校验
  tmMax?: number; // 最大值
  tmMin?: number; // 最小值
  tmSize?: "lg" | "mid" | "sm"; // 大输入框
  tmStep?: number; // 步进值
  tmThrottle?: number; // 点击事件节流阀（毫秒）
  tmThrottleConfig?: {}; // 节流阀设置
  tmValue?: number; // value 值
  tmNotEditable?: boolean; // 不允许通过input编辑
  tmPrecision?: number; // 数值精度
  children?: any; // 子组件内容
  className?: string; // 自定义类名
  style?: React.CSSProperties; // 自定义行内样式
  onBlur?: CommonEventFunction; // 失焦事件回调
  onChange?: (value?: number) => void; // 输入变化回调
  onConfirm?: CommonEventFunction; // 确认回调
  onFocus?: CommonEventFunction; // 聚焦回调
  onWxKeyboardHeightChange?: (event?: any) => void; // 键盘高度发生变化回调
}

function TmInputNumber(props: inputNumberProps) {
  const {
    tmBorder = false,
    tmDigit = false,
    tmDisabled = false,
    tmNotEditable = false,
    tmFocus = false,
    tmId = createUniqueId(),
    tmMax = 9999,
    tmMin = -9999,
    tmSize = "mid",
    tmStep = 1,
    tmThrottle = 500,
    tmThrottleConfig = {},
    tmValue = 1,
    tmPrecision = -1,
    onBlur = () => {},
    onChange = () => {},
    onConfirm = () => {},
    onFocus = () => {},
    onWxKeyboardHeightChange = () => {},
    className = "",
    style = {},
  } = props;

  const [valueCache, setValueCache] = useState<any>(0);
  const [decreaseEnable, setDecreaseEnable] = useState<boolean>(true);
  const [addEnable, setAddEnable] = useState<boolean>(true);

  // 点击减少
  const handleReduce = throttle(
    () => {
      setValueCache((prevState) => {
        const bigNum = 10e5;
        const value =
          prevState <= tmMin
            ? tmMin
            : (prevState * bigNum - tmStep * bigNum) / bigNum;
        onChange(value);
        return value < tmMin ? tmMin : value;
      });
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 点击增加
  const handleAdd = throttle(
    () => {
      setValueCache((prevState) => {
        const bigNum = 10e5;
        const value =
          prevState >= tmMax
            ? tmMax
            : (prevState * bigNum + tmStep * bigNum) / bigNum;
        onChange(value);
        return value > tmMax ? tmMax : value;
      });
    },
    tmThrottle,
    tmThrottleConfig
  );

  // 输入时回调
  const handleChange = (event) => {
    let { value } = event.detail;
    if (value > tmMax) {
      value = tmMax;
    }
    if (value < tmMin) {
      value = tmMin;
    }
    setValueCache(value);
  };

  // 失焦回调
  const handleBlur = (event) => {
    let { value } = event.detail;
    // 判断是否允许存在小数点
    if (!tmDigit) {
      value = Number.parseInt(value);
    }
    // 判断输入精度
    if (tmPrecision > 0) {
      value = parseFloat(value).toFixed(tmPrecision);
    }
    setValueCache(value);
    onChange(value);
    onBlur(event);
  };

  useLayoutEffect(() => {
    setValueCache(tmValue);
  }, [tmValue]);

  useLayoutEffect(() => {
    setDecreaseEnable(valueCache > tmMin);
    setAddEnable(valueCache < tmMax);
  }, [valueCache]);

  return (
    <View
      className={classNames(
        "tm-input-number",
        `tm-input-number-${tmSize}`,
        {
          "tm-input-number-disabled": tmDisabled,
          "tm-input-number-bordered": tmBorder,
        },
        className
      )}
      style={style}
    >
      <View
        className={classNames("tm-input-number__prefix", {
          "tm-input-number__prefix-disabled": !decreaseEnable,
        })}
        onClick={handleReduce}
      >
        <TmIcon tmValue="decrease" />
      </View>
      {/* 输入框 */}
      <View className="tm-input-number__content">
        <Input
          disabled={tmDisabled}
          focus={tmFocus}
          id={tmId}
          type={tmDigit ? "digit" : "number"}
          value={valueCache}
          onKeyboardHeightChange={onWxKeyboardHeightChange}
          onBlur={handleBlur}
          onInput={handleChange}
          onConfirm={onConfirm}
          onFocus={onFocus}
          style={{ pointerEvents: tmNotEditable ? "none" : "auto" }}
        />
      </View>
      <View
        className={classNames("tm-input-number__suffix", {
          "tm-input-number__suffix-disabled": !addEnable,
        })}
        onClick={handleAdd}
      >
        <TmIcon tmValue="add" />
      </View>
    </View>
  );
}

export default TmInputNumber;
