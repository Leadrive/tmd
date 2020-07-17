import "../demoStyle.scss";

import {TmAvatar, TmList, TmListItem, TmNavBar, TmSwitch,} from "../../../components";

import React from "react";
import {View} from "@tarojs/components";

function DemoList() {
  return (
    <View className={"demo"}>
      <TmNavBar tmTitle={"列表"}/>
      <TmList tmOuterBorder>
        <TmListItem tmTitle={"外边框"}/>
      </TmList>
      <TmList tmInnerBorder style={{marginTop: "12px"}}>
        <TmListItem tmTitle={"内边框"}/>
        <TmListItem tmTitle={"内边框"}/>
      </TmList>
      <TmList tmOuterBorder tmRound style={{marginTop: "12px"}}>
        <TmListItem tmTitle={"圆角"}/>
      </TmList>
      <TmList tmOuterBorder tmShadow style={{marginTop: "12px"}}>
        <TmListItem tmTitle={"阴影"}/>
      </TmList>
      <TmList
        tmShadow
        tmOuterBorder
        tmInnerBorder
        style={{marginTop: "12px"}}
      >
        <TmListItem tmTitle={"自定义标题"} tmSubtitle={"自定义二级标题"}/>
        <TmListItem
          tmTitle={"设置左侧图像"}
          tmSubtitle={"并显示右侧箭头"}
          tmShowArrow
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
            />
          }
        />
        <TmListItem tmTitle={"右侧文案"} tmAction={"文案"} tmShowArrow/>
        <TmListItem tmTitle={"顶部对齐"} TmTitleAlignTop tmShowArrow>
          很长长长长长长长长长长长长长长长长长长长长长长的内容
        </TmListItem>
        <TmListItem tmTitle={"禁用"} tmAction={<TmSwitch/>} tmDisabled/>
        <TmListItem tmTitle={"设置右侧操作项"} tmAction={<TmSwitch/>}/>
      </TmList>
      <TmList
        tmShadow
        tmOuterBorder
        tmInnerBorder
        tmIndent
        tmRound
        style={{marginTop: "12px"}}
      >
        <TmListItem tmTitle={"带缩进"} tmSubtitle={"自定义二级标题"}/>
        <TmListItem tmTitle={"圆角边框"}/>
        <TmListItem
          tmTitle={"自定义标题"}
          tmSubtitle={"自定义二级标题"}
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
            />
          }
        />
        <TmListItem
          tmTitle={"自定义标题"}
          tmSubtitle={"自定义二级标题"}
          tmImage={
            <TmAvatar
              tmSize={100}
              tmSrc={"https://i.loli.net/2020/06/02/BqaQ5fRbeNEw4A6.jpg"}
            />
          }
        />
      </TmList>
    </View>
  );
}

export default DemoList;
