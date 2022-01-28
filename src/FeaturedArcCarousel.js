import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import './styles.css';

const FeaturedArcCarousel = ({ slides }) => {
  const slidesRef = useRef([]);
  const progressBarRef = useRef(null);
  const paginationBarRef = useRef(null);

  const [slidesLength, setSlidesLength] = useState(slides.length);
  const [isDragging, setIsDragging] = useState(false);
  const [active, setActive] = useState(0);
  const [coordX, setCoordX] = useState(0);
  const [degrees, setDegrees] = useState(10);
  const [diameter, setDiameter] = useState(1800);
  const [cardTitle, setCardTitle] = useState('');
  const [cardDetail, setCardDetail] = useState('');
  const [paginationWidth, setPaginationWidth] = useState(0);
  const [paginationPosition, setPaginationPosition] = useState(0);

  const carouselSlides = useMemo(() => [...slides], [slides]);

  useEffect(() => {
    setSlidesLength(slides.length);
    if (slides.length < 36) {
      const initialSize = slides.length;
      const missing = 36 - slides.length;
      let i = 0;
      let currentIndex = 0;
      while (i < missing) {
        carouselSlides.push(slides[currentIndex]);
        currentIndex === initialSize - 1 ? (currentIndex = 0) : currentIndex++;
        i++;
      }
    }
  }, [slides, carouselSlides]);

  // RESIZE HANDLER
  useEffect(() => {
    const handleResize = () => {
      const calcDiameter =
        window.innerWidth >= 768
          ? Math.round(window.innerWidth) * 1.4
          : clampMobileWidthDiameter(
              800,
              (324 * window.innerWidth) / 100,
              1215
            ) * 1.3;
      setDegrees(10);
      setDiameter(calcDiameter);
      setPaginationWidth(progressBarRef.current?.offsetWidth / slidesLength);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  });

  const slideWidth = diameter / carouselSlides.length;
  const centerIndex = Math.round(carouselSlides.length / 2);

  const onUpdate = (latest) => {
    const activeIndex = getActiveIndex(slidesRef.current);
    setPaginationPosition(paginationWidth * carouselSlides[activeIndex].index);
    setCoordX(latest.x);
  };

  const getActiveIndex = (slides) => {
    return slides.findIndex((slide, index) => {
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

  const handleModifyTarget = (target) => {
    const snapTarget = Math.round(target / slideWidth) * slideWidth;
    return snapTarget;
  };

  const clampMobileWidthDiameter = (num, min, max) =>
    Math.min(Math.max(num, min), max);

  //INITIALIZE FIRST CARD DATA
  useEffect(() => {
    const firstSlide = carouselSlides[centerIndex];
    setCardTitle(firstSlide.title);
    setCardDetail(`${firstSlide.fecha} • ${firstSlide.title}`);
  }, [carouselSlides, centerIndex]);

  //INITIALIZE CAROUSEL VALUES
  useEffect(() => {
    console.log(window.innerWidth);
    const calcDiameter =
      window.innerWidth >= 768
        ? Math.round(window.innerWidth) * 1.4
        : clampMobileWidthDiameter(800, (324 * window.innerWidth) / 100, 1215) *
          1.3;
    setDegrees(10);
    setDiameter(calcDiameter);
    slidesRef.current = slidesRef.current.slice(0, carouselSlides.length);
  }, [carouselSlides]);

  //GET LATEST ACTIVE SLIDE
  useEffect(() => {
    const activeIndex = getActiveIndex(slidesRef.current);

    if (!isDragging) {
      setActive(activeIndex);
      setCardTitle(carouselSlides[activeIndex].title);
      setCardDetail(
        `${carouselSlides[activeIndex].year} • ${carouselSlides[activeIndex].category}`
      );
    }

    setPaginationPosition(paginationWidth * carouselSlides[activeIndex].index);
  }, [isDragging, carouselSlides, slidesLength, paginationWidth]);

  // SET INITIAL PAGINATION WIDTH
  useEffect(() => {
    setPaginationWidth(progressBarRef.current?.offsetWidth / slidesLength);
  }, [slidesLength]);

  return (
    <div className="root">
      <div className="container">
        <motion.div
          drag="x"
          onUpdate={onUpdate}
          dragElastic={0}
          dragTransition={{
            power: 0.0005,
            timeConstant: 0,
            modifyTarget: handleModifyTarget,
          }}
        >
          <div className="cards-container">
            {carouselSlides.map((slide, index) => {
              const isActive = index === active;
              const rotate = (index - centerIndex) * degrees;
              const divider = slideWidth / degrees;

              return (
                <motion.div
                  key={index}
                  ref={(el) => (slidesRef.current[index] = el)}
                  className={`card ${isActive ? 'active' : ''}`}
                  animate={{
                    rotate: coordX / divider + rotate,
                    transformOrigin: `50% ${diameter}px`,
                  }}
                  transition={{
                    ease: 'easeOut',
                    duration: 0.4,
                  }}
                  onAnimationStart={() => setIsDragging(true)}
                  onAnimationComplete={() => setIsDragging(false)}
                >
                  <img src={slide.imageUrl} alt="" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="content">
          <p className="feature-card-title label-2--medium">{cardTitle}</p>
          <p className="label-4 feature-card-detail">{cardDetail}</p>
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
