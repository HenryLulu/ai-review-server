#coding:utf-8
import sys,os
from PIL import Image,ImageDraw

def killRow(image):
    draw = ImageDraw.Draw(image)
    for y in xrange(1,image.size[1] - 1):
        # 行内分组计算：把每一行按50像素分组
        for group in range(1, image.size[0] - 1 - 50, 50):
            # 统计组内黑像素个数
            count = 0
            for x in range(group, group + 50):
                if (image.getpixel((x, y)) < 250):
                    count = count + 1
            # 当黑像素超过45，认为该组表示一条横线，全部替换为白像素
            if (count > 45):
                print 'Row ' + str(y) + ', Group ' + str(group) + ':' + str(count)
                for x in xrange(group, group + 50):
                    draw.point((x,y), 255)

def killCol(image):
    draw = ImageDraw.Draw(image)
    # 列的格子有中断，直接分组效果不好
    for x in xrange(1,image.size[0] - 1):
        tag = 1
        for y in range(1, image.size[1] - 1):
            # 如果点已经遍历过，continue
            if (y <= tag):
                continue
            # 从一个黑点开始计数
            if (image.getpixel((x, y)) < 250):
                count = 1
                continueWhiteCount = 0
                # 记录改点后100个点的黑点数
                for groupin in range(y, y - 1 + 100):
                    # 更新当前遍历点
                    tag = groupin
                    # 如果连续扫到10个白点，说明这里黑线断了，应该初始化
                    if (continueWhiteCount > 10):
                        break
                    if (image.getpixel((x, groupin)) < 250):
                        count = count + 1
                        continueWhiteCount = 0
                    else:
                        continueWhiteCount = continueWhiteCount + 1
                # 100点里有70个，说明是一条纵线
                if (count > 70):
                    print 'Col ' + str(x) + ', Group ' + str(groupin) + ':' + str(count)
                    for groupin in xrange(y, y + 100):
                        draw.point((x,groupin), 255)

#测试代码
def main():
    #打开图片
    image = Image.open("./img/source.jpg")
 
    #将图片转换成灰度图片
    image = image.convert("L")
     
    killRow(image)
    killCol(image)

    #保存图片
    image.save("./img/clear.jpg")
 
 
if __name__ == '__main__':
    main()