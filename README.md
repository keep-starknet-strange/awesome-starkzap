# ⚛️ Starknet Chain Reaction

A decentralized implementation of the classic **Chain Reaction** strategy game built on **Starknet** using **Cairo** smart contracts.  
Players compete to dominate the board by strategically placing atoms that trigger cascading explosions and convert neighboring cells.

This project demonstrates how **deterministic game logic** can be implemented on-chain with **provable outcomes** while maintaining real-time gameplay through a modern web interface.

---

# 🎮 Game Overview

**Chain Reaction** is a turn-based strategy game played on a grid board.

Players take turns placing atoms in cells.  
When a cell reaches its **critical mass**, it explodes and distributes atoms to its neighboring cells, potentially causing a **chain reaction**.

The objective is simple:

> **Eliminate all opponent atoms and control the entire board.**

---

# 🧠 Core Mechanics

### Board

The board is a **2D grid**.

Example:
