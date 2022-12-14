byte[] data = loadBytes("train.npy");
println(data.length);

size(280, 280);
//int total = (data.length-80)/784;
//println(total);

int total = 1000;
int outindex = 0;
byte[] outdata = new byte[total*784];
for(int n=0; n<total; n++){
  int start = 80 + n*784;
  PImage img = createImage(28, 28, RGB);
  for(int i=0; i<784; i++){
    int index = i+start;
    byte val = data[index];
    outdata[outindex] = val;
    outindex++;
    img.pixels[i] = color(255- val & 0xff);
  }
  img.updatePixels();
  int x = 28*(n%10);
  int y = 28*(n/10);
  image(img, x, y);
}
saveBytes("train1000.bin",outdata);
