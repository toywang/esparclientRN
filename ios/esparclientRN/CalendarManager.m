//
//  CalendarManager.m
//  esparclientRN
//
//  Created by TTSiMac on 2018/8/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>
#import <UIKit/UIKit.h>
#import "ChatViewController.h"
#import "AppDelegate.h"


@implementation CalendarManager

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLog(@"创建了event：%@ %@",name,location);
}
RCT_EXPORT_METHOD(addDateEvent:(NSString *)name date:(NSDate*)date)
{
  RCTLog(@"时间 ：%@ date:%@",name,date);
}
RCT_EXPORT_METHOD(addDetailEvent:(NSDictionary*)detail)
{
  RCTLog(@"收到的参数是：%@",detail);
}
RCT_EXPORT_METHOD(callBackEvent:(RCTResponseSenderBlock)callBack)
{
  NSDictionary *events = @{@"name":@"这是一个回调字典"};
  callBack(@[[NSNull null],events]);
}
RCT_EXPORT_METHOD(findEvent:(RCTPromiseResolveBlock)resolveBlock reject:(RCTPromiseRejectBlock)rejectBlock)
{
  NSString *backStr = @"返回一个promise";
  resolveBlock(backStr);
}
RCT_EXPORT_METHOD(toPushChatRoom:(NSString *)userid)
{
  RCTLog(@"收到的字符串:%@",userid);
  dispatch_async(dispatch_get_main_queue(), ^{
    AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication]delegate];
    ChatViewController *chatVC = [[ChatViewController alloc]init];
    [delegate.rootViewController pushViewController:chatVC animated:YES];
  });
  
}
@end
