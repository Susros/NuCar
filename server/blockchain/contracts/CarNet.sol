pragma solidity ^0.5.0;

import "./ECDSA.sol";

/// @title  The blockchain network for car owner validation
/// @author Kelvin Yin
/// @notice Use this contract for car ownership validation
/// @dev    Each car will have unique hash which is then map to
///         the address of the owner/borrower.
contract CarNet {

  // Store the signature of the car owner
  // [CarHash => OwnerSignature]
  mapping(bytes32 => bytes) ownerSignature;

  // Store the signature of the car borrower
  // [CarHash => BorrowerSignature]
  mapping(bytes32 => bytes) borrowerSignature;

  /// @notice Add new block on when car is added
  /// @dev    Make sure the message sender is the owner of the car
  ///
  /// @param  carHash   Unique hash code for the car
  /// @param  signature Signature that was signed by the owner of the car
  ///
  /// @return  True if success, throw error otherwise
  function addCar(bytes32 carHash, bytes memory signature) public returns (bool) {

    // Get signer from signature
    address signer = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(carHash, msg.sender))
      ), signature
    );

    // Verify if the sender is the owner
    require(
      signer == msg.sender,
      "Unauthorised signer has been dectected."
    );

    // Add owner signature
    ownerSignature[carHash] = signature;

    return true;

  }

  /// @notice Add new block when car is rented
  /// @dev    Make sure the message sender is the borrower who borrow the car
  ///
  /// @param  carHash      Unique hash code for the car
  /// @param  ownerAddress Address of car owner
  /// @param  signature    Signature theat was signed by the borrower of the car
  ///
  /// @return True if success, throw error otherwise
  function rentCar(bytes32 carHash, address ownerAddress, bytes memory signature) public returns (bool) {

    // Get address from owner signature
    address _ownerAddress = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(carHash, ownerAddress))
      ), ownerSignature[carHash]
    );

    // Verify the car belong to the right owner
    require(
      _ownerAddress == ownerAddress,
      "Car does not belong to the owner."
    );

    // Get signer from signature
    address signer = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(carHash, msg.sender))
      ), signature
    );

    // Verify the borrower address
    require(
      signer == msg.sender,
      "Unauthorised signer has been dectected."
    );

    // Add borrower signature
    borrowerSignature[carHash] = signature;

    return true;

  }

  /// @notice Add new block when car is returned
  /// @dev    Make sure the message sender is the borrower who borrow the car
  ///
  /// @param  carHash      Unique hash code for the car
  /// @param  ownerAddress Address of car owner
  ///
  /// @return True if success, throw error otherwise
  function returnCar(bytes32 carHash, address ownerAddress) public returns (bool) {

    // Get address from owner signature
    address _ownerAddress = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(carHash, ownerAddress))
      ), ownerSignature[carHash]
    );

    // Verify the car belong to the right owner
    require(
      _ownerAddress == ownerAddress,
      "Car does not belong to the owner."
    );

    // Get address from borrower signature
    address _borrowerAddress = ECDSA.recover(
      ECDSA.toEthSignedMessageHash(
        keccak256(abi.encodePacked(carHash, msg.sender))
      ), borrowerSignature[carHash]
    );

    // Verify the car returning belong to the right borrower
    require(
      _borrowerAddress == msg.sender,
      "Car does not belong to the borrower."
    );

    // Delete the borrower signature for the car
    delete borrowerSignature[carHash];

    return true;
  }

}
