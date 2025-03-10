import Container from "@/components/container";
import Images from "@/components/ui/images";
import  Particles  from "@/components/ui/particles";
import { SectionBadge } from "@/components/ui/section-bade";

const Connect = () => {
    return (
        <div className="flex flex-col bg-black items-center justify-center py-8 md:py-12 w-full">
            <Container>
                <div className="flex flex-col items-center text-center max-w-2xl bg-black mx-auto">
                    <SectionBadge title="Connect Tools" />
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                        Seamless Integration with your favorite tools
                    </h2>
                    <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6">
                        We support a wide range of integrations to help you connect your favorite tools with our platform
                    </p>
                </div>
            </Container>
            <Container>
                <div className="w-full relative mt-12 bg-black">
                    <Images.connect className="w-full bg-black h-auto" />
                    <Particles
                        className="absolute inset-0"
                        quantity={150}
                        ease={80}
                        color="#e4e4e7"
                        refresh
                    />
                </div>
            </Container>
        </div>
    )
};

export default Connect