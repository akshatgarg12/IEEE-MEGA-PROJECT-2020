import React, { useState } from 'react';
import { Button, Popover,PopoverBody } from 'reactstrap';

const CustomPopover = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Popover1" type="button" outline color="info">
        ?
      </Button>
      <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
        <PopoverBody>It will collect all the reviews of the product and will run a sentiment analysis on it so that you can be sure about the quality of reviews on this product before buying it.</PopoverBody>
      </Popover>
    </div>
  );
}

export default CustomPopover;