import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Input,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    Box,
    HStack,
    Checkbox,
    CheckboxGroup,
    Stack
  } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { BsDash } from 'react-icons/bs';
import {useSearchParams} from 'react-router-dom'

export default function FilterDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef();
  const [priceRange, setPriceRange] = useState([0,22995]);

  const [searchParams,setSearchParams] = useSearchParams();
  // console.log(searchParams,"search params from filter page");
  const initialStateBrand =  searchParams.getAll("brand");
  const initialStateType =  searchParams.getAll("type");
  const initialStateSize =  searchParams.getAll("size");

  const [selectedTypes, setSelectedTypes] = useState(initialStateType||[]);
  const [selectedSize, setSelectedSize] = useState(initialStateSize||[]);
  const [selectedBrand, setSelectedBrand] = useState(initialStateBrand||[]);
  
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

 const handleTypeChange = (e) => {
    setSelectedTypes([...e]);
  };
  // console.log(selectedTypes, 'this type')

 const handleSizeChange = (e) => {
  setSelectedSize([...e]);
  };
  // console.log(selectedSize,"this size");

 const handleBrandChange = (e) => {
  setSelectedBrand([...e]);
  };
  // console.log(selectedBrand,"this brand")

  useEffect(()=>{
      let params ={
          brand:selectedBrand,
          type:selectedTypes,
          size:selectedSize
      }

      setSearchParams(params);

  },[selectedBrand,selectedSize,selectedTypes])


  return (
    <>
      <Button ref={btnRef} colorScheme='blackAlpha' onClick={onOpen}>
        Filter
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            
          <Accordion defaultIndex={[0,1,2,3]} allowMultiple>
              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Price  
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                  <RangeSlider
                      aria-label={['min', 'max']}
                      defaultValue={[0, 22995.00]}
                      min={0}
                      max={22995.00}
                      step={1}
                      onChange={handlePriceRangeChange}>
                      <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                      <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <HStack>
                      <Input type='text' value={`${priceRange[0]}.00`} disabled color={'blackAlpha.900'}/> 
                      <BsDash/>
                      <Input type='text' value={`${priceRange[1]}.00`} disabled/> 
                  </HStack>
                  </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Product Type   
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <CheckboxGroup value={selectedTypes} onChange={handleTypeChange}>
                          <Checkbox value="bags" checked={selectedTypes.includes("bags")}>Bags</Checkbox><br/>
                          <Checkbox value="boots" checked={selectedTypes.includes("boots")}>Boots</Checkbox><br/>
                          <Checkbox value="pants" checked={selectedTypes.includes("pants")}>Pants</Checkbox><br/>
                          <Checkbox value="hats" checked={selectedTypes.includes("hats")}>Hats</Checkbox><br/>
                          <Checkbox value="hoodies" checked={selectedTypes.includes("hoodies")}>Hoodies</Checkbox><br/>
                          <Checkbox value="shirts" checked={selectedTypes.includes("shirts")}>Shirts</Checkbox><br/>
                          <Checkbox value="shorts" checked={selectedTypes.includes("shorts")}>Shorts</Checkbox><br/>
                          <Checkbox value="t-shirts" checked={selectedTypes.includes("t-shirts")}>T-Shirts</Checkbox><br/>
                          <Checkbox value="sandals" checked={selectedTypes.includes("sandals")}>Sandals</Checkbox><br/>
                      </CheckboxGroup>
                  </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Size
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <CheckboxGroup value={selectedSize} onChange={handleSizeChange}>
                      <Checkbox value="XS" checked={selectedSize.includes("XS")}>XS</Checkbox><br/>
                      <Checkbox value="S" checked={selectedSize.includes("S")}>S</Checkbox><br/>
                      <Checkbox value="M" checked={selectedSize.includes("M")}>M</Checkbox><br/>
                      <Checkbox value="L" checked={selectedSize.includes("L")}>L</Checkbox><br/>
                      </CheckboxGroup>
                  </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                  <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' fontWeight={600}>
                      Brand
                      </Box>
                      <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                      <CheckboxGroup value={selectedBrand} onChange={handleBrandChange}>
                          <Checkbox value="Koovs" checked={selectedBrand.includes("Koovs")}>Koovs</Checkbox><br/>
                          <Checkbox value="Nike" checked={selectedBrand.includes("Nike")}>Nike</Checkbox><br/>
                          <Checkbox value="5ive" checked={selectedBrand.includes("5ive")}>5ive</Checkbox><br/>
                          <Checkbox value="TheCoutourclub" checked={selectedBrand.includes("TheCoutourclub")}>The Coutour club</Checkbox><br/>
                      </CheckboxGroup>
                  </AccordionPanel>
              </AccordionItem>
              </Accordion>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
