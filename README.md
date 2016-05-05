###HTML5 Geolocation
####參考資料:

MDN：https://developer.mozilla.org/zh-TW/docs/Using_geolocation

中文W3c：http://www.w3school.com.cn/html5/html_5_geolocation.asp

https://robertnyman.com/2010/03/15/geolocation-in-web-browsers-to-find-location-google-maps-examples/

####API
+ getCurrentPosition(position) - 方法来获得用户的位置。
	+ 回傳物件
	
	> + coords.latitude - 緯度

	> + coords.longitude - 經度
	
	> + coords.accuracy - 位置精度
	
	> + coords.altitude - 海拔
	
	> + coords.altitudeAccuracy - 海拔的精度
	
	> + coords.heading	方向，从正北開始以度計
	
	> + coords.speed	速度，以米/每秒計
	
	> + timestamp	响应的日期/时间
	

+ watchPosition(position) - 持續返回使用者位置。
+ clearWatch() - 停止watchPosition()。

支援程度：
http://caniuse.com/#search=geo

####實際適用狀況

IOS 很不準，需開wifi且使用者必須於設定中開啟定位服務。

andriod - ??

######getCurrentPosition -> 用計時器持續取得

######watchPosition -> 可自己呼叫callBack但都很不準

