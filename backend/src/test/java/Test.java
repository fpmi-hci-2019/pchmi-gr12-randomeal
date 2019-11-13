import org.junit.Assert;

public class Test {

    @org.junit.Test
    public void testSay() {
        Sample sample = new Sample();
        Assert.assertEquals("Hey", sample.say("Hey"));
    }
}
