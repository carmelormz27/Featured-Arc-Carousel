import { motion, useMotionValue } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

import './FeaturedArcCarousel.css';

const FeaturedArcCarousel = ({
  slides,
  degrees,
  diameter,
  initialSlidesLength,
}) => {
  const slideWidth = diameter / slides.length;
  const centerIndex = 0;

  const slidesRef = useRef([]);
  const progressBarRef = useRef(null);
  const paginationBarRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [active, setActive] = useState(0);
  const [coordX, setCoordX] = useState(0);

  const [cardTitle, setCardTitle] = useState(slides[centerIndex].title);
  const [cardDetail, setCardDetail] = useState(slides[centerIndex].subtitle);
  const [cardUrl, setCardUrl] = useState(slides[centerIndex].url);
  const [paginationPosition, setPaginationPosition] = useState(0);
  const [paginationWidth, setPaginationWidth] = useState(0);

  const [isMounting, setIsMounting] = useState(true);

  const onUpdate = (latest) => {
    const activeIndex = getActiveIndex(slidesRef.current);
    setPaginationPosition(paginationWidth * slides[activeIndex].index);
    setCoordX(latest.x);
    setIsMounting(false);
  };

  const handleModifyTarget = (target) => {
    const snapTarget = Math.round(target / slideWidth) * slideWidth;
    return snapTarget;
  };

  const getActiveIndex = () => {
    return slidesRef.current.findIndex((slide, index) => {
      const deg =
        getComputedStyle(slide).getPropertyValue('-webkit-transform') ||
        getComputedStyle(slide).getPropertyValue('-moz-transform') ||
        getComputedStyle(slide).getPropertyValue('-ms-transform') ||
        getComputedStyle(slide).getPropertyValue('-o-transform') ||
        getComputedStyle(slide).getPropertyValue('transform');

      if (deg === 'none') {
        return true;
      }

      const values = deg.split('(')[1].split(')')[0].split(',');
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      return (
        Math.abs(angle) < 10 || Math.abs(angle) === 0 || Math.abs(angle) === 360
      );
    });
  };

  const buttonClickHandler = () => {
    if (window.featuredCarouselAnalytics?.buttonClick) {
      const activeIndex = getActiveIndex();

      window.featuredCarouselAnalytics.buttonClick(
        slides[activeIndex].index,
        slides[activeIndex].title,
        slides[activeIndex].url
      );
    }
  };

  const triggerSwapAnalyticsEvent = () => {
    if (window.featuredCarouselAnalytics?.slideSwaped) {
      const activeIndex = getActiveIndex();

      window.featuredCarouselAnalytics.slideSwaped(
        slides[activeIndex].index,
        slides[activeIndex].title,
        slides[activeIndex].url
      );
    }
  };

  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, slides.length);
  }, [slidesRef]);

  useEffect(() => {
    const activeIndex = getActiveIndex();

    if (!isDragging) {
      setActive(activeIndex);
      setCardTitle(slides[activeIndex].title);
      setCardDetail(slides[activeIndex].subtitle);
      setCardUrl(slides[activeIndex].url);

      if (!isMounting) {
        triggerSwapAnalyticsEvent();
      }
    }
    setPaginationPosition(paginationWidth * slides[activeIndex].index);
  }, [isDragging]);

  useEffect(() => {
    setPaginationWidth(
      progressBarRef.current?.offsetWidth / initialSlidesLength
    );
  }, [diameter]);

  return (
    <div className="carousel-root">
      <div className="carousel-container">
        <motion.div
          drag="x"
          onUpdate={onUpdate}
          dragElastic={0}
          dragTransition={{
            power: 0.05,
            timeConstant: 0,
            modifyTarget: handleModifyTarget,
          }}
        >
          <div className="carousel-cards-container">
            {slides.map((slide, index) => {
              const isActive = active === index;
              const rotate = (index - centerIndex) * degrees;
              const divider = slideWidth / degrees;

              return (
                <motion.div
                  key={index}
                  ref={(el) => (slidesRef.current[index] = el)}
                  className={`carousel-card ${isActive ? 'active' : ''}`}
                  initial={{
                    rotate: coordX / divider + rotate,
                    transformOrigin: `50% ${diameter}px`,
                  }}
                  animate={{
                    rotate: coordX / divider + rotate,
                    transformOrigin: `50% ${diameter}px`,
                  }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.3,
                  }}
                  onAnimationStart={() => setIsDragging(true)}
                  onAnimationComplete={() => setIsDragging(false)}
                >
                  <div className="carousel-card-img-container">
                    <img src={slide.imageUrl} alt="" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="carousel-content">
          <p className="feature-card-title label-2--medium">{cardTitle}</p>
          <p className="label-4 feature-card-detail">{cardDetail}</p>
          <a
            className="large-button featured-carousel-cta"
            href={cardUrl}
            target="_blank"
            rel="noreferrer"
            onClick={buttonClickHandler}
          >
            Stream ahora
          </a>
        </div>
      </div>
      <div ref={progressBarRef} className="featured-carousel-progress">
        <div
          ref={paginationBarRef}
          className="featued-carousel-pagination"
          style={{
            width: `${paginationWidth}px`,
            marginLeft: `${paginationPosition}px`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FeaturedArcCarousel;
