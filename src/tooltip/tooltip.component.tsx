import React from 'react';
import { Button } from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';
import styles from './tooltip.scss';

interface CustomTooltipProps {
  continuous: boolean;
  index: number;
  step: any;
  backProps: any;
  closeProps: any;
  primaryProps: any;
  tooltipProps: any;
  totalSteps: number;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  continuous,
  index,
  step,
  backProps,
  primaryProps,
  tooltipProps,
  totalSteps,
}) => {
  const { t } = useTranslation();
  const isLastStep = index === totalSteps - 1;

  return (
    <div {...tooltipProps} className={styles.tooltipcontainer}>
      <div className={styles.tooltipheader}>
        <h4 className={styles.tooltiptitle}>{step.title}</h4>
        <span className={styles.tooltipstep}>{`${index + 1}/${totalSteps}`}</span>
      </div>
      <div className={styles.tooltipcontent}>{step.content}</div>
      <div className={styles.tooltipfooter}>
        {!step.hideBackButton && index > 0 && (
          <div {...backProps} size="sm" className={styles.buttonback}>
            <ArrowLeft style={{ marginRight: '8px' }} />
            {t('back', 'Back')}
          </div>
        )}
        {continuous && !step.hideNextButton && (
          <Button {...primaryProps} size="sm" className={styles.buttonnext}>
            {isLastStep ? (
              <>{t('finish', 'Finish')}</>
            ) : (
              <>
                {t('next', 'Next')}
                <div className={styles.arrowContainer}>
                  <ArrowRight />
                </div>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CustomTooltip;
